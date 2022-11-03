export function BeverageGenerator () {
    this.itemList = document.querySelector('.bever-ul');
}


BeverageGenerator.prototype.getData = async function() {
    const dataResponse = await fetch('src/js/beverage_data.json');
    
    if(dataResponse.ok) {
        callback(await dataResponse.json());
    } else {
        alert('통신에러. 데이터 없을걸~ 현재 통신 상태 : ' + dataResponse.status)
    }
}




