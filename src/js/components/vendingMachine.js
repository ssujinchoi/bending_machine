export class VendingMachine {
    constructor() {
        const pickSection = document.querySelector('.pick-bever-section');
        this.itemList = pickSection.querySelector('.bever-ul'); // 음료리스트
        this.balanceTxt = pickSection.querySelector('.balance-txt'); // 잔액
        this.moneyPut = pickSection.querySelector('.deposit-input'); // 입금액
        this.returnBtn = pickSection.querySelector('.return-coin-btn'); // 반환버튼
        this.moneyPutBtn = pickSection.querySelector('.deposit-coin-btn'); // 입금버튼
        this.getBtn = pickSection.querySelector('.get-btn'); // 획득버튼
        this.cartList = pickSection.querySelector('.cart-ul'); // 장바구니 리스트

        const infoSection = document.querySelector('.now-info-section');
        this.myMoneyTxt = infoSection.querySelector('.now-money-txt'); // 소지금
        this.gainList = infoSection.querySelector('.gain-bever-ul'); // 획득음료 리스트
        this.totalTxt = infoSection.querySelector('.total-price-txt'); // 총금액
    }

    setUp() {
        this.bindEvents();
    }

    bindEvents() {
        /**
         * 1. 입금버튼 기능
         * 입금액을 입력 -> 입금버튼 -> 소지금 = 소지금 - 입금액, 잔액 = 기존잔액 + 입금액
         * 입금액이 소지금 보다 많으면 '소지금이 부족합니다' 띄우고 입금액창 초기화
         */

        this.moneyPutBtn.addEventListener('click', event => {
            const inputVal = parseInt(this.moneyPut.value);
            // .textContent - 텍스트노드 값에 접근
            const myMoneyVal = parseInt(this.myMoneyTxt.textContent.replaceAll(',', '')); 
            const balanceVal = parseInt(this.balanceTxt.textContent.replaceAll(',', ''));
            
            if(inputVal) {
                // 입금액이 소지금 보다 적거나 같을때
                if (inputVal <= myMoneyVal) {
                    // 소지금 = 기존 소지금 - 입금액
                    this.myMoneyTxt.textContent = new Intl.NumberFormat().format(myMoneyVal - inputVal) + '원';
                    // 잔액이 0이면 0 + 입금액, 잔액이 있으면 기존잔액 + 입금액
                    this.balanceTxt.textContent = new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputVal) + '원';
                    this.moneyPut.value = "";
                } else { // 입금액이 소지금 보다 많을때
                    alert('소지금이 부족합니다.');
                    this.moneyPut.value = "";
                }
            }
        })
    }
}