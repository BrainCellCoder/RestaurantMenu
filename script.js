let foodItems;

async function getMenu() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    foodItems = await response.json();
    console.log(foodItems);
    displayMenu(foodItems);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayMenu(foodItems) {
  const menuContainer = document.getElementById("menu-items");
  foodItems.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("item");
    menuItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button class="addBtn" onclick="addToCart(${item.id},'${item.name}', ${item.price})" >Add</button>
        `;
    menuContainer.appendChild(menuItem);
  });
}

function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let order = [];
      for (let i = 0; i < 3; i++) {
        let randomItem =
          foodItems[Math.floor(Math.random() * foodItems.length)];
        order.push(randomItem);
      }
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

window.onload = () => {
  getMenu()
    .then((message) => {
      console.log(message);
      return takeOrder();
    })
    .then((order) => {
      console.log("Order received:", order);
      return orderPrep();
    })
    .then((orderStatus) => {
      console.log("Order prepared:", orderStatus);
      return payOrder();
    })
    .then((paymentStatus) => {
      console.log("Payment status:", paymentStatus);
      if (paymentStatus.paid) {
        thankyouFnc();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// function addToCart(itemId, itemName, itemPrice) {
//   cartList.push({
//     itemId,
//     itemName,
//     itemPrice,
//   });
//   console.log(cartList);
// }
