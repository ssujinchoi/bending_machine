export function BeverageGenerator () {
    this.itemList = document.querySelector('.bever-ul');
}

BeverageGenerator.prototype.setup = function() {
    this.getData(json => {
        this.renderData(json);
    })
}

BeverageGenerator.prototype.getData = async function(callback) {
    
    const dataResponse = await fetch('src/js/beverage_data.json');
    if(dataResponse.ok) {
        callback(await dataResponse.json());
    } else {
        alert('통신에러. 데이터 없을걸~ 현재 통신 상태 : ' + dataResponse.status)
    }
}

BeverageGenerator.prototype.renderData = function(dataJirong) {
    console.log('데이터를 잘 받아오는지 확인', dataJirong);

    const docFrag = document.createDocumentFragment();

    dataJirong.forEach(el => {
        const item = document.createElement('li');
        item.classList.add('bever-list-item');
        const itemTemplate = `
        <button type="button" class="bever-pick-btn comBtnStyl" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
        <img src="src/images/${el.img}" alt="">
        <strong class="bever-name">${el.name}</strong>
        <span class="bever-price">${el.cost}원</span>
        </button>
        `;
        
        item.innerHTML = itemTemplate;
        // 최적화
        docFrag.appendChild(item);
    });
    
    this.itemList.appendChild(docFrag);
}
