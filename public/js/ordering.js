var state = "select-table";

var order = {
    tableNumber: 0,
    pizza: [

    ],
    drink: [

    ],
    price: 0
};



function updateState(){

    $('.select-table').hide();
    $('.select-items').hide();
    $('.select-drinks').hide();

    switch (state) {
        case "select-table":
            $('.select-table').show();
            break;
        case "select-items":
            $('.select-items').show();
            $('.select-drinks').show();
            break;
        default:
            break;
    }
}



function onSubmitButton() {
    order.tableNumber = $('#table-number').val();
    $('#displayTableNum').html(order.tableNumber);
    console.log(order);
    state = "select-items";
    updateState();
};
 
function onPizzaAddButton() {

    var type = JSON.parse($('#pizza-type').val());
    var size = JSON.parse($('#pizza-size').val());
    var base = JSON.parse($('#pizza-base').val());
    var extra = [
        
    ];

    ($('#pizza-extra').val()).forEach(toppingstr => {
        extra.push(JSON.parse(toppingstr));
    });

    var pizza = {
        type: type.name,
        size: size.name,
        base: base.name,
        extra: [

        ],
        price: type.price + size.price + base.price 
    };
    extra.forEach(topping => {
        pizza.extra.push(topping.name);
        pizza.price += topping.price;
    });

    order.pizza.push(pizza);

    order.price += pizza.price;

    displayOrder();
    //console.log(order);

}

function displayOrder() {

    var orderList = "";

    (order.pizza).forEach(pizza => {
        orderList += pizza.type+":<br/> &emsp;"+pizza.size+"<br/>&emsp;"+pizza.base+"<br/>&emsp;Extras: <br/> ";
        (pizza.extra).forEach(extra => {
            orderList += "&emsp;&emsp;"+extra+"<br/>";
        });
        orderList
        orderList += "<br/>";
    });

    orderList += `Price: £${order.price}`;

    $('#order-list').html(orderList);

}

updateState();