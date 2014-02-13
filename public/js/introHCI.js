'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	var url = '/project/' + idNumber;
	$.get(url, addResponse);
}

var id;

function addResponse(response) {
	id = response['id'];	
	var query = $('#project' + id).find('p').text();
	var details = $('#project' + id).find('.' + 'details');
	var projectHTML =  '<img src="' + response['image'] + '" class="detailsImage">' + 
	'<p><strong>Due date: </strong>' + response['date'] + '</p>' + 
	'<p>' + response['summary'] + '</p>';

	details.html(projectHTML);

	var url = '<script src="https://gdata.youtube.com/feeds/api/videos?alt=json-in-script&key=AIzaSyB1BoCj7vOafVodCxK1h3JQh26OfYpHauY&callback=processYT&fields=entry&q=' + encodeURIComponent(query) + '"></script>';
	$('body').append(url);

}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	$.get('/palette', addColors);
}

function addColors(response) {
	var colors = response['colors']['hex'];
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}

function processYT(response) {
	var entries = response['feed']['entry'];
	var videoId = entries[0]['id']['$t'].substr('http://gdata.youtube.com/feeds/api/videos/'.length);
	$('#project' + id).find('.details').append('<iframe src="http://www.youtube.com/embed/' + videoId + '"></iframe>');
}