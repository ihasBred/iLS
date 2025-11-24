const modal = document.getElementById("orderFormModal");
const btn = document.getElementById("openForm");
const span = document.querySelector(".close");

btn.onclick = () => { modal.style.display = "block"; }
span.onclick = () => { modal.style.display = "none"; }
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }

const addRowBtn = document.getElementById("addRow");
const tableBody = document.querySelector("#orderTable tbody");

addRowBtn.addEventListener("click", () => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" placeholder="Product Name"></td>
        <td><input type="number" placeholder="Quantity"></td>
        <td><input type="text" placeholder="Remarks"></td>
        <td><button class="deleteRow">Delete</button></td>
    `;
    tableBody.appendChild(newRow);
});

tableBody.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("deleteRow")) {
        const row = e.target.closest("tr");
        row.remove();
    }
});


const deliveryDate = document.getElementById("deliveryDate");

deliveryDate.addEventListener("change", function () {
    const selectedDate = new Date(this.value);
    const day = selectedDate.getUTCDay();

    if (day === 0) {
        alert("Delivery cannot be scheduled on Sunday. Please choose another date.");
        this.value = "";
    }
});

deliveryDate.setAttribute("min", new Date().toISOString().split("T")[0]);


const submitBtn = document.querySelector(".modal-content button[type='submit']");

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const deliveryDateValue = document.getElementById("deliveryDate").value.trim();

    if (!name || !email || !contact || !deliveryDateValue) {
        alert("Please fill in all required fields.");
        return;
    }

    const rows = document.querySelectorAll("#orderTable tbody tr");
    const orderItems = [];

    rows.forEach(row => {
        const product = row.cells[0].querySelector("input").value.trim();
        const quantity = row.cells[1].querySelector("input").value.trim();
        const remarks = row.cells[2].querySelector("input").value.trim();

        if (product && quantity) {
            orderItems.push({ product, quantity, remarks });
        }
    });

    if (orderItems.length === 0) {
        alert("Please add at least one product.");
        return;
    }

    let summary = `Order Summary\n\nName: ${name}\nEmail: ${email}\nContact: ${contact}\nDelivery Date: ${deliveryDateValue}\n\nItems:\n`;

    orderItems.forEach((item, index) => {
        summary += `${index + 1}. ${item.product} — Qty: ${item.quantity} — Remarks: ${item.remarks || "None"}\n`;
    });

    alert(summary);

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("deliveryDate").value = "";

    rows.forEach((row, index) => {
        if (index > 0) row.remove();
        else {
            row.cells[0].querySelector("input").value = "";
            row.cells[1].querySelector("input").value = "";
            row.cells[2].querySelector("input").value = "";
        }
    });

    modal.style.display = "none";
});


document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Message sent! We will contact you soon.");
    this.reset();
});

function toggleCrew() {
    const crewPopup = document.getElementById("crew-popup");
    crewPopup.style.display = crewPopup.style.display === "block" ? "none" : "block";
}


function toggleCrew() {
    const crewPopup = document.getElementById("crew-popup");
    if(crewPopup.classList.contains("show")) {
        crewPopup.classList.remove("show");
        setTimeout(() => crewPopup.style.display = "none", 500);
    } else {
        crewPopup.style.display = "block";
        setTimeout(() => crewPopup.classList.add("show"), 10);
    }
}

const scrollElements = document.querySelectorAll(".animate-on-scroll");

const elementInView = (el, offset = 0) => {
    const top = el.getBoundingClientRect().top;
    return top <= ((window.innerHeight || document.documentElement.clientHeight) - offset);
};

const displayScrollElement = (el) => {
    el.classList.add("show");
};

const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);
