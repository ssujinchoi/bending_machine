export class VendingMachine {
    constructor() {
        const pickSection = document.querySelector(".pick-bever-section");
        this.itemList = pickSection.querySelector(".bever-ul"); // 음료리스트
        this.balanceTxt = pickSection.querySelector(".balance-txt"); // 잔액
        this.moneyPut = pickSection.querySelector(".deposit-input"); // 입금액
        this.returnBtn = pickSection.querySelector(".return-coin-btn"); // 반환버튼
        this.moneyPutBtn = pickSection.querySelector(".deposit-coin-btn"); // 입금버튼
        this.getBtn = pickSection.querySelector(".get-btn"); // 획득버튼
        this.cartList = pickSection.querySelector(".cart-ul"); // 장바구니 리스트

        const infoSection = document.querySelector(".now-info-section");
        this.myMoneyTxt = infoSection.querySelector(".now-money-txt"); // 소지금
        this.gainList = infoSection.querySelector(".gain-bever-ul"); // 획득음료 리스트
        this.totalTxt = infoSection.querySelector(".total-price-txt"); // 총금액
    }

    setUp() {
        this.bindEvents();
    }

    // 선택한 음료수 목록 생성 - 장바구니
    cartItemGenerator(target) {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        cartItem.dataset.item = target.dataset.item;
        cartItem.dataset.price = target.dataset.price; // 획득한 음료구역 총금액에 필요함.
        cartItem.innerHTML = `
        <button class="cart-item-btn comBtnStyl">
            <img src="./src/images/${target.dataset.img}" alt="" class="cart-item-img">
            <span class="cart-item-name">${target.dataset.item}</span>
            <span class="cart-item-num">1</span>
        </button>
        `;
        this.cartList.appendChild(cartItem);
    }

    // 이벤트 바인드
    bindEvents() {
        /**
         * 1. 입금버튼 기능
         * 입금액을 입력 -> 입금버튼 -> 소지금 = 소지금 - 입금액, 잔액 = 기존잔액 + 입금액
         * 입금액이 소지금 보다 많으면 '소지금이 부족합니다' 띄우고 입금액창 초기화
         */
        this.moneyPutBtn.addEventListener("click", (event) => {
            const inputVal = parseInt(this.moneyPut.value);
            // .textContent - 텍스트노드 값에 접근
            const myMoneyVal = parseInt(
                this.myMoneyTxt.textContent.replaceAll(",", "")
            );
            const balanceVal = parseInt(
                this.balanceTxt.textContent.replaceAll(",", "")
            );

            if (inputVal) {
                // 입금액이 소지금 보다 적거나 같을때
                if (inputVal <= myMoneyVal) {
                    // 소지금 = 기존 소지금 - 입금액
                    this.myMoneyTxt.textContent =
                        new Intl.NumberFormat().format(myMoneyVal - inputVal) +
                        "원";
                    // 잔액이 0이면 0 + 입금액, 잔액이 있으면 기존잔액 + 입금액
                    this.balanceTxt.textContent =
                        new Intl.NumberFormat().format(
                            (balanceVal ? balanceVal : 0) + inputVal
                        ) + "원";
                    this.moneyPut.value = "";
                } else {
                    // 입금액이 소지금 보다 많을때
                    alert("소지금이 부족합니다.");
                    this.moneyPut.value = "";
                    this.moneyPut.focus();
                }
            }
        });

        /**
         * 2. 거스름돈 반환 기능
         * 거스름돈 반환 버튼을 누르면 -> 소지금 = 기존 소지금 + 잔액
         * 잔액은 초기화 된다.
         */
        this.returnBtn.addEventListener("click", () => {
            const myMoneyVal = parseInt(
                this.myMoneyTxt.textContent.replaceAll(",", "")
            );
            const balanceVal = parseInt(
                this.balanceTxt.textContent.replaceAll(",", "")
            );

            if (balanceVal) {
                this.myMoneyTxt.textContent =
                    new Intl.NumberFormat().format(myMoneyVal + balanceVal) +
                    "원";
                this.balanceTxt.textContent = "원";
            } else {
                alert("반환할 거스름돈이 없습니다.");
            }
        });

        /**
         * 3. 음료 선택 기능
         * 잔액이 음료가격보다 크거나 같을 때만 작동해야함.
         * 음료를 선택하면 현재 그 음료의 재고를 확인 -> 재고가 있으면 그 음료의 가격 확인하고 잔액 = 잔액 - 음료가격
         * 잔액이 선택한 음료가격보다 적다면 경고창
         * 장바구니에 음료추가(렌더링)하고 음료의 data-count 는 -1.
         * 음료 재고가 sold-out 클래스를 붙여준다.
         */

        // ul에 이벤트를 달아서 이벤트 위임을 하면 안되는 것인가? -> 이벤트 위임은 접근성에 문제 -> voice over를 켜고 버튼을 스페이스로 눌러보면 이벤트를 실행할 수 있는데 이것은 버튼 각각에 이벤트리스너가 있어야 작동한다. 이벤트 위임으로는 할 수 없다.
        const beverBtns = this.itemList.querySelectorAll("button");

        beverBtns.forEach((item) => {
            item.addEventListener("click", () => {
                //console.log(item.dataset.count);
                const balanceVal = parseInt(
                    this.balanceTxt.textContent.replaceAll(",", "")
                );

                let isStaged = false; // 이미 선택되었는지 여부
                const targetElPrice = parseInt(item.dataset.price); // 선택한 음료의 가격
                const cartListItem = this.cartList.querySelectorAll("li");

                // 선택한 음료가격보다 잔액이 많거나 같아야 획득가능
                if (balanceVal >= targetElPrice) {
                    this.balanceTxt.textContent =
                        new Intl.NumberFormat().format(
                            balanceVal - targetElPrice
                        ) + "원";

                    item.dataset.count--;
                    console.log(item.dataset.count);
                    // 음료가 품절인 경우 품절 표시
                    if (parseInt(item.dataset.count) === 0) {
                        item.parentElement.classList.add("sold-out");
                    }

                    // 선택한 음료가 이미 장바구니에 있는 음료인지 탐색
                    // forEach문 사용 시 break, return을 사용한 반복종료를 할 수 없으므로, 비효율적
                    for (const cItem of cartListItem) {
                        if (cItem.dataset.item === item.dataset.item) {
                            cItem.querySelector(".cart-item-num").textContent++;
                            isStaged = true;
                            break;
                        }
                    }

                    // 해당 음료를 처음 선택했을 경우
                    if (!isStaged) {
                        this.cartItemGenerator(item);
                    }
                } else {
                    alert("잔액이 부족합니다. 돈을 입금하세요");
                    this.moneyPut.focus();
                }

                const cartBtns = this.cartList.querySelectorAll("button");

                cartBtns.forEach((el) => {
                    el.addEventListener("click", cartDelete);
                });
            });
        });

        /**
         * 4. 음료 장바구니 삭제 기능
         *
         */
        //cartDelete() {

        //}
    }
}
