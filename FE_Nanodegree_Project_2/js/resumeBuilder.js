/*
This is empty on purpose! Your code to build the resume will go here.
 */

// The bio object
var bio = {
	"name": "Calvin Ku",
	"role": "Web Developer",
	"contacts": {
		"mobile": "+86 186 2030 9095",
		"email": "calvin.j.ku@outlook.com",
		"github": "savourylie",
		"twitter": "CalvinJianBaiKu",
		"location": "Shenzhen, China"
	},
	"welcomeMessage": "To infinity... and beyond!",
	"skills": ["awesomeness", "video game master", "being kind", "having a nice day"],
	"bioPic": "images/me.jpg"
}

bio.display = function() {

	var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
	var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
	var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);

	$('#topContacts').append(formattedMobile);
	$('#topContacts').append(formattedEmail);
	$('#topContacts').append(formattedGithub);
	$('#topContacts').append(formattedTwitter);

	// for (var contact in bio.contacts) {

	// 	$('#topContacts').append('<li><span style="color: #f5a623">' + contact + '</span> ' + '<span style="color: white">' + bio.contacts[contact] + '</span></li>');
	// }
	// $('#topContacts').append('<li>mobile ' + this.contacts.mobile + '</li>');
	// $('#topContacts').append('<li>email ' + this.contacts.email + '</li>');
	// $('#topContacts').append('<li>github ' + this.contacts.github + '</li>');
	// $('#topContacts').append('<li>mobile ' + this.contacts.mobile + '</li>');

	var formattedImage = HTMLbioPic.replace("%data%", bio.bioPic);
	$("#header").append(formattedImage);
	$("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
	$("#header").prepend(HTMLheaderName.replace("%data%", bio.name));

	if (bio.skills.length !== 0) {
		$("#header").append(HTMLskillsStart);
		for (var skill in bio.skills) {
			$("#skills").append(HTMLskills.replace("%data%", bio.skills[skill]));
		}
	}

};

bio.display(); // To be moved to bottom later

// The education object
var education = {
	"schools": [
		{
			"name": "University of East Anglia",
			"location": "Norwich, UK",
			"degree": "MSc",
			"majors": ["Mathematics"],
			"dates": 2009,
			'url': "http://www.uea.ac.uk/"
		},
		{
			"name": "National Cheng Kung Univeristy",
			"city": "Tainan, Taiwan",
			"degree": "BS",
			"majors": ["Aeronautics and Astronautics"],
			"dates": 2006,
			'url': "http://web.ncku.edu.tw/"
		}
	],

	"onlineCourses": [
		{
			"title": "Machine Learning",
			"school": "Stanford University",
			"dates": 2014,
			"url": "http://www.coursera.com"
		}
	]
};

// var HTMLschoolLocation = '<div class="location-text">%data%</div>';
// var HTMLschoolMajor = '<em><br>Major: %data%</em>';

// var HTMLonlineClasses = '<h3>Online Classes</h3>';
// var HTMLonlineTitle = '<a href="#">%data%';
// var HTMLonlineSchool = ' - %data%</a>';
// var HTMLonlineDates = '<div class="date-text">%data%</div>';
// var HTMLonlineURL = '<br><a href="#">%data%</a>';

education.display = function() {
	$("#education").append(HTMLschoolStart);

	for (var school in education.schools) {
		var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
		formattedSchoolName = formattedSchoolName.replace('<a href="#">', '<a href="' + education.schools[school].url + '">');
		var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
		var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
		var formattedMajors = HTMLschoolMajor.replace("%data%", education.schools[school].majors[0]);

		$(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree);
		$(".education-entry:last").append(formattedDates);
		$(".education-entry:last").append(formattedMajors);
	}

	$(".education-entry:last").append(HTMLonlineClasses);

	for (var course in education.onlineCourses) {
		var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
		var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
		var titlenSchool = formattedOnlineTitle + formattedOnlineSchool;
		var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
		var formattedOnlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[course].url);

		$(".education-entry:last").append(titlenSchool);
		// $("#education").append(formattedOnlineSchool);
		$(".education-entry:last").append(formattedOnlineDates);
		$(".education-entry:last").append(formattedOnlineURL);
	}


// var HTMLonlineTitle = '<a href="#">%data%';
// var HTMLonlineSchool = ' - %data%</a>';
// var HTMLonlineDates = '<div class="date-text">%data%</div>';
// var HTMLonlineURL = '<br><a href="#">%data%</a>';

};


education.display();

// The work object
var work = {};

work.jobs = [
	{
		"employer": "Medici Software",
		"title": "AI Engineer",
		"location": "Guangzhou, China",
		"dates": "March, 2014 - May, 2015",
		"description": "AI stuff"
	},
	{
		"employer": "ChinaStepOne",
		"title": "Slacker",
		"location": "Shenzhen, China",
		"dates": "Nov, 2011 - April, 2013",
		"description": "Started doing nothing at CSO from Jul, 2015"
	},
	{
		"employer": "National Tainan Institute of Nursing",
		"title": "Teacher",
		"location": "Tainan, Taiwan",
		"dates": "Feb - Jun, 2010",
		"description": "Taught English conversation ans stuff"
	}
];

work.display = function() {
	for (job in work.jobs) {
		$("#workExperience").append(HTMLworkStart);
		var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
		var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
		var formattedEmployerTitle = formattedEmployer + formattedTitle;
		var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
		var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
		var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);

		$(".work-entry:last").append(formattedEmployerTitle);
		$(".work-entry:last").append(formattedLocation);
		$(".work-entry:last").append(formattedDates);
		$(".work-entry:last").append(formattedDescription);
	}
};

work.display();

// The project object
var projects = {};

projects.projects = [
		{
			"title": "LifeInShenzhen",
			"dates": "Nov, 2011 - Feb, 2012",
			"description": "Provide foreigners in Shenzhen services that are essential to their day to day life.",
			// "images": []
		},
		{
			"title": "WorkInShenzhen",
			"dates": "Nov, 2011 - Feb, 2012",
			"description": "Provide foreigners in Shenzhen services that are essential in their day to day work."
			// "images": []
		}
];


projects.display = function() {
	$("#projects").append(HTMLprojectStart);
	for (project in projects.projects) {
		var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
		var formattedProjectData = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
		var formattedProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);

		$(".project-entry:last").append(formattedProjectTitle);
		$(".project-entry:last").append(formattedProjectData);
		$(".project-entry:last").append(formattedProjectDescription);
	}

};

projects.display();

//Google Maps

$("#mapDiv").append(googleMap);

// var HTMLschoolDates = '<div class="date-text">%data%</div>';

$(document).click(function(loc) {
	console.log("X: " + loc.clientX + ", " + "Y: " + loc.clientY);
});

// Append Internationalize Button to the main div
internationalizeButton = internationalizeButton.replace('<button>', '<button onclick="inName()">');

$('#main').append(internationalizeButton);

function inName() {
	var name = bio.name;
	var name_arr = name.split(" ");
	var first_name = name_arr[0];
	var last_name = name_arr[1];

	last_name = last_name.toUpperCase();

	return first_name + " " + last_name;
}


// "employer": "Medici Software",
// "title": "AI Engineer",
// "location": "Guangzhou, China",
// "dates": "2014-2015",
// "description": "AI stuff"
//
//
// education["name"] = "UEA";
// education["years"] = 2008;
// education["city"] = "Norwich";

// var formattedName = HTMLheaderName.replace("%data%", bio.name);
// var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
// var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
// var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
// var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
// var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

// var formattedPosition = HTMLworkTitle.replace("%data%", work.position)
// var formattedSchool = HTMLschoolName.replace("%data%", education.name);

// $("#header").append(formattedName);
// $("#header").append(formattedRole);
// $("#header").append(formattedMobile);
// $("#header").append(formattedEmail);
// $("#header").append(formattedTwitter);
// $("#header").append(formattedLocation);
// $("#header").append(formattedPosition);
// $("#header").append(formattedSchool);




