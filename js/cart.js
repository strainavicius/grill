// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.totalCount = function() {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();

// *****************************************
// Triggers / Events
// *****************************************
// Add item
$(".add-to-cart").click(function(event) {
  event.preventDefault();
  var name = $(this).data("name");
  var price = Number($(this).data("price"));
  shoppingCart.addItemToCart(name, price, 1);
  alert("Sėkmingai pridėta į krepšelį!");
  displayCart();
});

// Clear items
$(".clear-cart").click(function() {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  var total = 0;
  for (var i in cartArray) {
    console.log(cartArray[i].name);
    total += parseFloat(cartArray[i].total);

    output +=
      "<div class='row'>" +
      "<div class='col-12 text-sm-center col-sm-12 text-md-left col-md-8'>" +
      "<h4 class='product-name'><strong>" +
      cartArray[i].name +
      "</strong></h4>" +
      "<h4>" +
      "<small>Iš viso: " +
      cartArray[i].total +
      "</small>" +
      "</h4>" +
      "</div>" +
      "<div class='col-12 col-sm-12 text-sm-center col-md-4 text-md-right row'>" +
      "<div class='col-3 col-sm-3 col-md-6 text-md-right' style='padding-top: 5px'>" +
      "<h6><strong>" +
      cartArray[i].price +
      " <span class='text-muted'>x</span></strong></h6>" +
      "</div>" +
      "<div class='col-4 col-sm-4 col-md-4'>" +
      "<div class='quantity'>" +
      "<input type='button' value='+' class='plus-item' data-name='" +
      cartArray[i].name +
      "'>" +
      "<input type='number' step='1' max='99' min='1' data-name='" +
      cartArray[i].name +
      "' value='" +
      cartArray[i].count +
      "' title='Qty' class='qty item-count' size='4'>" +
      "<input type='button' value='-' class='minus-item' data-name='" +
      cartArray[i].name +
      "'>" +
      "</div>" +
      "</div>" +
      "<div class='col-2 col-sm-2 col-md-2 text-right'>" +
      "<button type='button' class='delete-item btn btn-outline-danger btn-xs' data-name='" +
      cartArray[i].name +
      "'>" +
      "<i class='fa fa-trash' aria-hidden='true'></i>" +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "<hr>";
  }
  $("#cart-list").html(output);
  $("#total-price").html(total.toFixed(2));
  $(".total-cart").html(shoppingCart.totalCart());
  $(".total-count").html(shoppingCart.totalCount());
  sessionStorage.setItem("totalprice", total.toFixed(2));
}

// Delete item button

$("#cart-list").on("click", ".delete-item", function(event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// -1
$("#cart-list").on("click", ".minus-item", function(event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCart(name);
  displayCart();
});
// +1
$("#cart-list").on("click", ".plus-item", function(event) {
  var name = $(this).data("name");
  shoppingCart.addItemToCart(name);
  displayCart();
});

// Item count input
$("#cart-list").on("change", ".item-count", function(event) {
  var name = $(this).data("name");
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();

$("#checkout-btn").click(function() {
  var r = confirm("Pavirtinate užsakymą?");
  if (r == true) {
    var cart = sessionStorage.getItem("shoppingCart");
    var price = sessionStorage.getItem("totalprice");
    var info = $("#ord-info").val();
    var address = $("#ord-address").val();
    var paytype = $("#ord-type").val();
    if (!cart || !price || !address || !paytype) {
      alert("Neįvestas pristatymo adresas!");
    } else {
      $("#preloader").fadeIn();
      jQuery.ajax({
        url: "checkout.php",
        data: "cart=" + cart + "&price=" + price + "&info=" + info + "&address=" + address + "&type=" + paytype,
        type: "POST",
        success: function(response) {
          $("#preloader")
            .delay(500)
            .fadeOut("slow", function() {
              if (response.error === false) {
                alert(response.message);
                shoppingCart.clearCart();
                displayCart();
                window.location.reload();
              } else {
                alert(response);
              }
            });
        },
        error: function(response) {
          alert(response);
        }
      });
    }
  } else {
    txt = "Užsakymo apmokėjimas atmestas.";
  }
});
