
document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate subtotal for an item row
    function updateSubtotal(row) {
        const priceElement = row.querySelector(".price");
        const qtyInput = row.querySelector(".quantity");
        const totalElement = row.querySelector(".total");
        if (!priceElement || !qtyInput || !totalElement) return;

        const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, "")) || 0;
        const qty = parseInt(qtyInput.value) || 0;
        const subtotal = price * qty;
        totalElement.textContent = "₹" + subtotal.toFixed(2);
        updateGrandTotal();
    }

    // Function to update grand total on the page
    function updateGrandTotal() {
        const totals = document.querySelectorAll(".total");
        let grandTotal = 0;
        totals.forEach(t => {
            grandTotal += parseFloat(t.textContent.replace(/[^0-9.]/g, "")) || 0;
        });
        const grandTotalElement = document.querySelector("#grand-total");
        if (grandTotalElement) grandTotalElement.textContent = "₹" + grandTotal.toFixed(2);
    }

    // Add listeners to all quantity inputs
    document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("input", () => {
            updateSubtotal(input.closest(".menu-item"));
        });
    });

    // Handle "Place Order" button clicks to add to cart (temporary in-page logic)
    document.querySelectorAll(".place-order").forEach(btn => {
        btn.addEventListener("click", () => {
            const itemRow = btn.closest(".menu-item");
            if (!itemRow) return;
            const name = itemRow.querySelector(".item-name")?.textContent || "Item";
            const price = itemRow.querySelector(".price")?.textContent || "₹0";
            const qty = itemRow.querySelector(".quantity")?.value || "1";
            const total = itemRow.querySelector(".total")?.textContent || price;

            const cartTable = document.querySelector("#cart-items");
            if (cartTable) {
                const newRow = document.createElement("tr");
                newRow.innerHTML = `<td>${name}</td><td>${price}</td><td>${qty}</td><td>${total}</td>`;
                cartTable.appendChild(newRow);
                updateGrandTotal();
            }
        });
    });

    // Initialize totals on load
    document.querySelectorAll(".menu-item").forEach(row => updateSubtotal(row));
});
