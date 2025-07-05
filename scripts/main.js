let sitesTableBody = document.querySelector("table tbody")

let sites = [];

let index = 0;

if (localStorage.sites) {
    sites = JSON.parse(localStorage.sites);
    index = sites.length;
    displaySites();
}

function readSiteData() {
    let siteObj = {};
    siteObj.name = document.getElementById("site-name").value;
    siteObj.url = document.getElementById("site-url").value;
    return siteObj;
}

function createIndexCell(index, siteRow) {
    let indexCell = document.createElement("td")
    indexCell.innerHTML = index + 1;
    siteRow.appendChild(indexCell);
}

function createNameCell(siteName, siteRow) {
    let nameCell = document.createElement("td")
    nameCell.innerHTML = siteName;
    siteRow.appendChild(nameCell);
}

function createSiteLinkButton(siteURL, siteRow) {
    let visitButtonCell = document.createElement("td")
    let siteURLButton = document.createElement("button")
    siteURLButton.classList.add("visit")
    let siteLink = document.createElement("a")
    siteLink.href = `${siteURL}`
    siteLink.target = "_blank"
    siteLink.innerHTML =
        `
    <i class="fa-solid fa-eye pe-2"></i>
    Visit
    `
    siteURLButton.appendChild(siteLink)
    visitButtonCell.appendChild(siteURLButton)
    siteRow.appendChild(visitButtonCell)
}

function createSiteDeleteButton(siteRow) {
    let deleteButtonCell = document.createElement("td")
    let siteDeleteButton = document.createElement("button")
    siteDeleteButton.classList.add("delete")
    siteDeleteButton.innerHTML =
        `
    <i class="fa-solid fa-trash-can"></i>
    Delete
    `
    deleteButtonCell.appendChild(siteDeleteButton)
    siteRow.appendChild(deleteButtonCell)
}

// ADD Site
function addSiteEle(siteObj, index) {
    let siteRow = document.createElement("tr")
    siteRow.dataset.index = index;
    createIndexCell(index, siteRow);
    createNameCell(siteObj.name, siteRow);
    createSiteLinkButton(siteObj.url, siteRow);
    createSiteDeleteButton(siteRow);
    sitesTableBody.appendChild(siteRow);
}

document.getElementById("add").addEventListener("click", function (e) {
    e.preventDefault();
    if (validateData(document.querySelector("#site-name"))
        && validateData(document.querySelector("#site-url"))) {
        let siteObj = readSiteData()
        addSiteEle(siteObj, index)
        sites.push(siteObj);
        localStorage.sites = JSON.stringify(sites);
        index++;
    }
})

// Display Sites

function displaySites() {
    sitesTableBody.innerHTML = "";
    for (let i = 0; i < sites.length; i++) {
        addSiteEle(sites[i], i);
    }
}

// Delete Site 
document.querySelector("table").addEventListener("click", function (e) {
    if (e.target.className === "delete") {
        let currentIndex = e.target.parentElement.parentElement.dataset.index
        sites.splice(currentIndex, 1)
        index--;
        localStorage.sites = JSON.stringify(sites)
        displaySites()
    }
})

// Validation
function validateData(ele) {
    regex = {
        "site-name": /^[a-z1-9]+/i,
        "site-url": /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm,
    }
    if (regex[ele.id].test(ele.value)) {
        document.getElementById("add").style.cssText = "cursor: pointer;";
        ele.classList.remove("is-invalid")
        ele.classList.add("is-valid")
        return true
    }
    else {
        document.getElementById("add").style.cssText = "cursor: no-drop"
        ele.classList.remove("is-valid")
        ele.classList.add("is-invalid")
        return false
    }
}

document.querySelector("#site-name").addEventListener("input", function () {
    validateData(document.querySelector("#site-name"))
})

document.querySelector("#site-url").addEventListener("input", function () {
    validateData(document.querySelector("#site-url"))
})