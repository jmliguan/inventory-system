class Inventory {
    constructor() {
        this.items = {};
    }

    addItem(name, quantity, price) {
        if (this.items[name]) {
            this.items[name].quantity += quantity; // Update quantity if item exists
            this.items[name].price = price; // Update price
        } else {
            this.items[name] = { quantity, price }; // Add new item with price
        }
        this.displayItems();
    }

    removeItem(name, quantity) {
        if (this.items[name]) {
            this.items[name].quantity -= quantity; // Decrease quantity
            if (this.items[name].quantity <= 0) {
                delete this.items[name]; // Remove item if quantity is 0 or less
            }
            this.displayItems();
        } else {
            console.log(`${name} does not exist in inventory.`);
        }
    }

    displayItems() {
        const inventoryList = document.getElementById('inventoryList');
        inventoryList.innerHTML = ''; // Clear current list
        for (const [name, { quantity, price }] of Object.entries(this.items)) {
            const listItem = document.createElement('li');
            const totalValue = (quantity * price).toFixed(2); // Calculate total value
            listItem.textContent = `${name}: ${quantity} @ $${price.toFixed(2)} each (Total: $${totalValue})`;
            inventoryList.appendChild(listItem);
        }
    }
}

const inventory = new Inventory();

document.getElementById('addItem').addEventListener('click', () => {
    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value, 10);
    const price = parseFloat(document.getElementById('itemPrice').value);
    if (name && !isNaN(quantity) && quantity > 0 && !isNaN(price) && price >= 0) {
        inventory.addItem(name, quantity, price);
        document.getElementById('itemName').value = ''; // Clear input
        document.getElementById('itemQuantity').value = '';
        document.getElementById('itemPrice').value = '';
    } else {
        alert('Please enter valid item details.');
    }
});

document.getElementById('removeItem').addEventListener('click', () => {
    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value, 10);
    if (name && !isNaN(quantity) && quantity > 0) {
        inventory.removeItem(name, quantity);
        document.getElementById('itemName').value = ''; // Clear input
        document.getElementById('itemQuantity').value = '';
        document.getElementById('itemPrice').value = '';
    } else {
        alert('Please enter valid item details.');
    }
});
