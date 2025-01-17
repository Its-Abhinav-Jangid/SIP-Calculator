document.addEventListener("keydown", (e) => {
	if (e.key === "Enter") calculate();
});
const sliders = document.querySelectorAll("input[type='range']");
for (let slider of sliders) {
	updateSlider(slider);
}

const chartCanvas = document.querySelector(".chart");

const myChart = new Chart(chartCanvas, {
	type: "doughnut",
	data: {
		labels: ["Returns", "Amount Invested"],
		datasets: [
			{
				label: "",
				data: [40, 60],
				backgroundColor: ["hsl(233.02deg 100% 66.27%)", "orange"],
			},
		],
	},
	options: {
		plugins: {
			legend: {
				labels: {
					color: "#666", // Text color
					font: {
						size: 14, // Font size
						family: "Rubik", // Font family
					},
					padding: 20, // Padding around labels
					boxWidth: 15, // Width of the color box
					boxHeight: 10, // Height of the color box
				},
				position: "top", // Position of the legend (e.g., 'top', 'bottom', 'left', 'right')
			},
		},
	},
});

calculate();
function formatAmount(value) {
	value = String(value);
	if (value.length <= 3) return value;
	let index = 0;
	value =
		value.substring(0, value.length - 3) +
		"," +
		value.substring(value.length - 3, value.length);
	for (let i = value.length - 3; i >= 0; i--) {
		index++;
		if (index % 2 === 0 && index !== 2) {
			value =
				value.substring(0, i) + "," + value.substring(i, value.length);
		}
	}
	if (index % 2 === 0) {
		value = value.substring(1, value.length); // remove any leading comma
	}
	return value;
}

function calculate() {
	const amountPerMonth = parseInt(
		document.getElementById("amount-display").value
	);
	const roi = parseInt(document.getElementById("roi-slider").value);
	const duration = parseInt(document.getElementById("duration-slider").value);
	const principleEl = document.getElementById("principle");
	const intrestEl = document.getElementById("intrest");
	const totalAmountEl = document.getElementById("total-amount");
	if (
		amountPerMonth <= 0 ||
		roi <= 0 ||
		duration <= 0 ||
		!amountPerMonth ||
		!roi ||
		!duration
	) {
		return;
	}
	const totalPrincipleCalc = amountPerMonth * duration * 12;
	let amount = 0;
	let intrestPerMonth = 0;

	for (let i = 0; i < duration * 12; i++) {
		amount += amountPerMonth;
		intrestPerMonth = (roi / 100 / 12) * amount;
		amount += intrestPerMonth;
	}

	principleEl.innerHTML = `₹${formatAmount(totalPrincipleCalc)}`;
	intrestEl.innerHTML = `₹${formatAmount(
		Math.floor(amount - totalPrincipleCalc)
	)}`;
	totalAmountEl.innerHTML = `₹${formatAmount(Math.floor(amount))}`;
	myChart.data.datasets[0].data = [
		Math.floor(amount - totalPrincipleCalc),
		Math.floor(totalPrincipleCalc),
	];
	myChart.update();
}
function updateAmount(value) {
	const amountLabel = document.getElementById("amount-display");
	const amountSlider = document.getElementById("amount-slider");
	amountLabel.value = value;
	amountSlider.value = value;
	updateSlider(amountSlider);
}
function updateDuration(value) {
	const durationLabel = document.getElementById("duration-display");
	const durationSlider = document.getElementById("duration-slider");
	durationLabel.value = value;
	durationSlider.value = value;
	updateSlider(durationSlider);
}
function updateROI(value) {
	const ROILabel = document.getElementById("roi-display");
	const ROISlider = document.getElementById("roi-slider");
	ROILabel.value = value;
	ROISlider.value = value;
	updateSlider(ROISlider);
}
function updateSlider(element) {
	const min = element.min;
	const max = element.max;
	const curr = element.value;
	const percentage = ((curr - min) / (max - min)) * 100;

	element.style.background = `linear-gradient(to right, rgb(0, 184, 82) ${percentage}%, #ddd ${percentage}%)`;
}
