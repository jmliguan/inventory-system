class Inventory {
    constructor() {
        this.items = {};
    }

    addItem(name, quantity) {
        if (this.items[name]) {
            this.items[name] += quantity; // Update quantity if item exists
        } else {
            this.items[name] = quantity; // Add new item
        }
        this.displayItems();
    }

    removeItem(name, quantity) {
        if (this.items[name]) {
            this.items[name] -= quantity; // Decrease quantity
            if (this.items[name] <= 0) {
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
        for (const [name, quantity] of Object.entries(this.items)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${name}: ${quantity}`;
            inventoryList.appendChild(listItem);
        }
    }
}

const inventory = new Inventory();

document.getElementById('addItem').addEventListener('click', () => {
    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value, 10);
    if (name && !isNaN(quantity) && quantity > 0) {
        inventory.addItem(name, quantity);
        document.getElementById('itemName').value = ''; // Clear input
        document.getElementById('itemQuantity').value = '';
    } else {
        alert('Please enter a valid item name and quantity.');
    }
});

document.getElementById('removeItem').addEventListener('click', () => {
    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value, 10);
    if (name && !isNaN(quantity) && quantity > 0) {
        inventory.removeItem(name, quantity);
        document.getElementById('itemName').value = ''; // Clear input
        document.getElementById('itemQuantity').value = '';
    } else {
        alert('Please enter a valid item name and quantity.');
    }
});
