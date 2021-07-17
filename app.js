const checkOutBtn = document.querySelector(".checkout");
const totalAmountToPay = document.querySelector(".total-pay");
const currentUserTicketList = document.querySelector(".ticket-list");
const currentTotalVacantSeat = document.querySelector(".vacant-seats");
const currentUserTotalTicket = document.querySelector(".total-tickets");
const showCurrentMessage = document.querySelector(".show-message");

let bookedSeats = [05, 06, 10, 15, 18, 19, 20, 23, 26, 30, 34, 40, 43, 44];

class MAIN {
	currentTotalVacantSeat() {
		currentTotalVacantSeat.innerHTML = "";
		const seat = 44 - bookedSeats.length;
		const div = document.createElement("div");

		div.innerHTML = `
			<p>${seat} Seats Available</p>
		`;
		currentTotalVacantSeat.appendChild(div);
	}

	currentUserTotalTicket() {
		currentUserTotalTicket.innerHTML = "";
		const tickets = bookedSeats.length - 14;
		const div = document.createElement("div");

		div.innerHTML = `
			<p>You Added ${tickets} Tickets</p>
		`;
		currentUserTotalTicket.appendChild(div);
	}

	totalAmountToPay() {
		totalAmountToPay.innerHTML = "";
		const tickets = bookedSeats.length - 14;
		const div = document.createElement("div");

		div.innerHTML = `
			<p>${tickets} X 500 = ${tickets * 500} BDT</p>
		`;
		totalAmountToPay.appendChild(div);
	}

	currentUserSelectedTicketByID() {
		const seatButtons = [...document.querySelectorAll(".seat")];

		seatButtons.forEach((button) => {
			let isBooked = bookedSeats.indexOf(parseInt(button.dataset.id));

			if (isBooked > -1) {
				button.classList.add("seat-booked");
				button.disabled = true;
			} else {
				button.addEventListener("click", (event) => {
					button.classList.add("user-seat");
					button.disabled = true;

					if (bookedSeats.length < 20) {
						this.addSelectedTicketToTicketListDOM(
							event.target.dataset.id
						);
						this.removeSelectedTicketFromTicketListDOM();
						this.currentTotalVacantSeat();
						this.currentUserTotalTicket();
						this.totalAmountToPay();
					} else {
						button.classList.remove("user-seat");
						button.disabled = false;
						this.showCurrentMessage(`<p>Max SIX Allowed</p>`);
					}
				});
			}
		});
	}

	addSelectedTicketToTicketListDOM(id) {
		const div = document.createElement("div");
		div.classList.add("ticket-row");

		div.innerHTML = `
			<p>${id}</p>
			<button class="btn-remove" data-id=${id}>
				<i class="fas fa-trash" data-id=${id}></i>
			</button>
		`;

		currentUserTicketList.appendChild(div);
		bookedSeats.push(parseInt(id));
	}

	removeSelectedTicketFromTicketListDOM() {
		const removeButtons = [...document.querySelectorAll(".btn-remove")];

		removeButtons.forEach((button) => {
			button.addEventListener("click", (event) => {
				let id = parseInt(event.target.dataset.id);
				bookedSeats = bookedSeats.filter((item) => item !== id);
				button.parentNode.remove();

				id = id < 10 ? "0" + id : id;
				this.showCurrentMessage(`<p>Seat ${id}  Removed</p>`);
				this.resetAllSeatOutlook();
				this.currentTotalVacantSeat();
				this.currentUserTotalTicket();
				this.totalAmountToPay();
			});
		});
	}

	resetAllSeatOutlook() {
		const seatButtons = [...document.querySelectorAll(".seat")];

		seatButtons.forEach((button) => {
			let isBooked = bookedSeats.indexOf(parseInt(button.dataset.id));

			if (isBooked < 0) {
				button.classList.remove("user-seat");
				button.classList.remove("seat-booked");
				button.disabled = false;
			}
		});
	}

	showCurrentMessage(string) {
		showCurrentMessage.classList.add("active");
		showCurrentMessage.innerHTML = string;

		setTimeout(() => {
			showCurrentMessage.classList.remove("active");
		}, 1000);
	}
}

function clearAllTicketFromTicketList() {
	const length = bookedSeats.length;

	for (let i = length; i > 14; i--) {
		bookedSeats.pop();
	}
	while (currentUserTicketList.firstChild) {
		currentUserTicketList.removeChild(currentUserTicketList.firstChild);
	}

	const main = new MAIN();
	main.resetAllSeatOutlook();
	main.currentTotalVacantSeat();
	main.currentUserTotalTicket();
	main.totalAmountToPay();
}

document.addEventListener("DOMContentLoaded", function () {
	const main = new MAIN();
	main.currentTotalVacantSeat();
	main.currentUserSelectedTicketByID();
	main.currentUserTotalTicket();
	main.totalAmountToPay();

	if (currentUserTicketList.classList.contains("ticket-row")) {
		main.removeSelectedTicketFromTicketListDOM();
	}

	checkOutBtn.addEventListener("click", () => {
		if (bookedSeats.length > 14) {
			main.showCurrentMessage(
				`<p>You Paid ${(bookedSeats.length - 14) * 500} BDT</p>`
			);
			clearAllTicketFromTicketList();
		} else {
			main.showCurrentMessage(`<p>Added Nothing</p>`);
		}
	});
});
