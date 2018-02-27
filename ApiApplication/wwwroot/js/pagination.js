
//This is pagination of the pages.
var currentPage;
function Pagination(amountperpage, pagingcontainer, pagingcontrols, index) {
    //It is number of items per page.
   
    elementsPerPage = amountperpage;
    pagingContainer = $(pagingcontainer);
    elements = $('tr', pagingContainer); 
    //It is the container for navigation.
    pagingControlsContainer = pagingcontrols;
    //It is a container with content.
    pagingContainerPath = pagingcontainer;
    //It is the management of the currentPage page.
    switch (true) {
        case index === 'fist': 
            currentPage = 1;
            showPage(1);
            break;
        case index === 'last': 
            showPage(numPages());
            break;
        case index === 'current':
            currentPage = currentPage;
            showPage(currentPage);
            break;          
    }     
}

//This is counting the total number of pages.      
function numPages() {
    var numPages = 0;
    if (elements != null && elementsPerPage != null) {
        numPages = Math.ceil(elements.length / elementsPerPage);
    }
    return numPages;
};

//This is a page display.
//page is the page number to be displayed.
function showPage(page) {
    currentPage = page;
    var html = "";
    //It is the formation of the contents of the current page.         
    for (var i = (page - 1) * elementsPerPage; i < ((page - 1) * elementsPerPage) + elementsPerPage; i++) {
        if (i < elements.length) { 
            var elem = elements.get(i);
            html += "<tr>" + elem.innerHTML + "</tr>";      
        }    
    }
    
    //It is the inclusion of content in the DOM structure. 
    $(pagingContainerPath).html(html);
    //It is a navigation update.        
    renderControls(pagingControlsContainer, currentPage, numPages());
}


// It is a navigation update. 
// container is the container for the contents of the current page.
// currentPage is the number of the current page.
// numPages is the total number of pages.
function renderControls(container, currentPage, numPages) {
    //It is the formation of the markup of navigation.
    var pagingControls = "<ul>";
    for (var i = 1; i <= numPages; i++) {
        if (i != currentPage) {
            if (i == currentPage - 1 || i == currentPage || i == currentPage + 1 || i == currentPage + 2) {
                pagingControls += "<li><a class='pages' href='#' onclick='showPage(" + i + "); return;'>" + i + "</a></li>";
            }
        } else {
            pagingControls += "<li>" + i + "</li>";
        }
    }

    if (currentPage < numPages - 2) {
        pagingControls += "<li>. . . <a class='pages' href='#' onclick='showPage(" + numPages + "); return;'>" + numPages + "</a></li>";
    };
    pagingControls += "</ul>";

    //It is inserting the navigation markup in the DOM
    $(container).html(pagingControls);
}

