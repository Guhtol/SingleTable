var Table = (function () {
	var htmlTableBody = [];
	var nameProperty = "";
	var inputId = "";
	var inputName = "";
	var paragraphId = "";
	var trElement = "";
	var tdElement = "";
	var pElement = "";
	var iElement = "";
	var inputElement = "";
	var tbody = "";

	function getTypeProperty(param) {
		return typeof param;
	};
	function createTemplate(name, index) {
		tbody = document.getElementById(name);
        trElement = document.createElement("tr");				
		trElement.id = index;
	}
	function appendBodyTable() {
		tbody.appendChild(trElement);
	}
	function insertRow(nameList, bodyTable, object) {
		htmlTableBody = [];
		createTemplate(bodyTable, object.index);
		for (property in object) {
			if (getOnlyPropertyDinamic(property)) {
				createInputId(property, nameList, object);
				createParagraphId(property, nameList, object);
				createInputName(property, nameList, object);
				createRow(object[property]);
			};
		};
		createRowEdit(object);
		createRowDelet(object, nameList);
		appendBodyTable();
		incriseIndex(object);

	};
	function getInput(property) {
		if (typeof property === "string") {
			this.property = document.getElementById(property);
		}
	};
	function deletRow(index, namelist, object) {
		console.log(object.row[index]);
		console.log(namelist);
	}
	function createInputId(property, nameList, object) {
		var inputIdArray = [];
		inputIdArray.push(replaceId(nameList));
		inputIdArray.push(object.index);
		inputIdArray.push(replaceId(property));
		inputId = inputIdArray.join("_");
	};
	function createInputName(property, nameList, object) {
		var inputNameArray = [];
		inputNameArray.push(replaceName(nameList));
		inputNameArray.push('[' + object.index + ']');
		inputNameArray.push(replaceName("." + property));
		inputName = inputNameArray.join("");
	};
	function createParagraphId(property, nameList, object) {
		var paragraphArray = [];
		paragraphArray.push(replaceId('p' + nameList));
		paragraphArray.push(object.index);
		paragraphArray.push(replaceId(property));
		paragraphId = paragraphArray.join("_");
	}
	function createRow(property) {
		appendRow();
		configRow(property);
	};
	function appendRow() {
		tdElement = document.createElement("td");
		pElement = document.createElement("p");
		inputElement = document.createElement("input");
		trElement.appendChild(tdElement);
		tdElement.appendChild(pElement);
		tdElement.appendChild(inputElement);
	}
	function configRow(property) {
		inputElement.id = inputId;
		inputElement.name = inputName;
		inputElement.type = "hidden";
		inputElement.value = property.value
		pElement.id = paragraphId;
		pElement.textContent = property.value;
	}
	function createRowEdit(object) {
		iElement = document.createElement("i");
		tdElement = document.createElement("td");
		tdElement.appendChild(iElement);
		trElement.appendChild(tdElement);
		iElement.style.cursor = "pointer";
		iElement.onclick = function () { sayHelo() };
		iElement.textContent = "Editar";
	};
	function createRowDelet(object, nameList) {
		iElement = document.createElement("i");
		tdElement = document.createElement("td");
		tdElement.appendChild(iElement);
		trElement.appendChild(tdElement);
		iElement.style.cursor = "pointer";
		iElement.onclick = function teste() { sayHelo() };
		iElement.textContent = "Deletar";
	};
	function sayHelo() {
		console.log("Implement Edit and Delet");
	};
	function addRowArray(object, nameList) {
		var newRow = new InnerRow(paragraphId, inputId, inputName, nameList);
		object.row.push(newRow);
	}
	function replaceName(param) {
		param = param.replace('_', '.');
		return param;
	};
	function replaceId(param) {
		param = param.replace('.', '');
		return param;
	};
	function incriseIndex(object) {
		object.index++;
	};
	function decreaseIndex(object) {
		object.index--;
	};
	function getOnlyPropertyDinamic(param) {
		switch (param) {
			case "DeletLine":
				return false;
			case "index":
				return false;
			case "row":
				return false;
			case "InsertLine":
				return false;
			default:
				return true;
		}
	};
	function InnerTable() {
		this.index = 0;
		this.row = [];
		for (property in arguments) {
			nameProperty = arguments[property];
			switch (getTypeProperty(nameProperty)) {
				case "string":
					this[nameProperty] = document.getElementById(nameProperty);
					break;
				case "object":
					this[nameProperty.attr("id")] = nameProperty;
					nameProperty = nameProperty.attr("id");
					break;
			}
		};
	};
	function InnerRow(paragraphId, inputId, name, nameList) {
		this.paragraph = paragraphId;
		this.input = inputId;
		this.name = name;
		this.nameList = nameList;
	};

	InnerTable.prototype.InsertLine = function (nameList, bodyTable) {
		insertRow(nameList, bodyTable, this);
	};
	InnerTable.prototype.DeletLine = function (index, nameList) {
		console.log(this.row);
	}
	return InnerTable;
})();
