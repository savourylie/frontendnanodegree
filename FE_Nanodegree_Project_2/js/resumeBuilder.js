/*
This is empty on purpose! Your code to build the resume will go here.
 */

/*
This refactorization is done in the refactor-resume branch.

(That is, if it's not then I'm in big trouble...)
*/

$(function(){

	// Model

    var model = {

        init: function() {
                localStorage.resume_data = JSON.stringify(model);
        },

        getAllData: function() {
            return JSON.parse(localStorage.resume_data);
        },

        bio: {
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
		},

		education: {
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
					"location": "Tainan, Taiwan",
					"degree": "BEng",
					"majors": ["Aeronautics and Astronautics"],
					"dates": 2006,
					'url': "http://web.ncku.edu.tw/"
				},
				{
					"name": "Rubbish School",
					"location": "Los Angeles, US",
					"degree": "BS",
					"majors": ["B*llshitology"],
					"dates": 3001,
					'url': "http://www.stanford.edu/"
				}
			],

			"onlineCourses": [
				{
					"title": "Machine Learning",
					"school": "Coursera",
					"dates": 2014,
					"url": "http://www.coursera.com"
				}
			]
		},

		work: {
			"jobs": [
				{
					"employer": "Medici Software",
					"title": "AI Engineer",
					"location": "London, UK",
					"dates": "March, 2014 - May, 2015",
					"description": "AI stuff"
				},
				{
					"employer": "ChinaStepOne",
					"title": "Slacker",
					"location": "Shenzhen, China",
					"dates": "Nov, 2011 - April, 2013",
					"description": "Started being a slacker at CSO from Jul, 2015"
				},
				{
					"employer": "National Tainan Institute of Nursing",
					"title": "Teacher",
					"location": "Tainan, Taiwan",
					"dates": "Feb - Jun, 2010",
					"description": "Taught English conversation ans stuff"
				}
			]
		},

		projects: {
			projects: [
				{
					"title": "LifeInShenzhen",
					"dates": "Nov, 2011 - Feb, 2012",
					"description": "Provide foreigners in Shenzhen services that are essential to their day to day life.",
					"images": ["http://placehold.it/350x150", "http://placekitten.com/g/150/150"]
				},
				{
					"title": "WorkInShenzhen",
					"dates": "Nov, 2011 - Feb, 2012",
					"description": "Provide foreigners in Shenzhen services that are essential in their day to day work.",
					"images": ["http://placehold.it/350x150", "http://placekitten.com/g/150/150"]
				}
			]
		}
    };

    // Octopus

    var octopus = {
        getData: function() {
            return model.getAllData();
        },

        init: function() {
            model.init();
            view.init();
        }
    };

    // View

    var view = {
        init: function() {
            view.render.bio();
            view.render.education();
            view.render.work();
            view.render.project();
        },

        render: {
        	bio: function() {
        		var formattedMobile = HTMLmobile.replace("%data%", octopus.getData().bio.contacts.mobile);
				var formattedEmail = HTMLemail.replace("%data%", octopus.getData().bio.contacts.email);
				var formattedGithub = HTMLgithub.replace("%data%", octopus.getData().bio.contacts.github);
				var formattedTwitter = HTMLtwitter.replace("%data%", octopus.getData().bio.contacts.twitter);
				var formattedLocation = HTMLlocation.replace("%data%", octopus.getData().bio.contacts.location);

				// Top Contatcts
				$('#topContacts').append(formattedMobile);
				$('#topContacts').append(formattedEmail);
				$('#topContacts').append(formattedGithub);
				$('#topContacts').append(formattedTwitter);
				$('#topContacts').append(formattedLocation);


				// Footer Contacts
				$('#footerContacts').append(formattedMobile);
				$('#footerContacts').append(formattedEmail);
				$('#footerContacts').append(formattedGithub);
				$('#footerContacts').append(formattedTwitter);
				$('#footerContacts').append(formattedLocation);

				var formattedMessage = HTMLwelcomeMsg.replace("%data%", octopus.getData().bio.welcomeMessage);
				var formattedImage = HTMLbioPic.replace("%data%", octopus.getData().bio.bioPic);
				$("#header").append(formattedImage);
				$('#header').append(formattedMessage);
				$("#header").prepend(HTMLheaderRole.replace("%data%", octopus.getData().bio.role));
				$("#header").prepend(HTMLheaderName.replace("%data%", octopus.getData().bio.name));

				if (octopus.getData().bio.skills.length !== 0) {
					$("#header").append(HTMLskillsStart);
					for (var skill in octopus.getData().bio.skills) {
						$("#skills").append(HTMLskills.replace("%data%", octopus.getData().bio.skills[skill]));
					}
				}

				console.log("render.bio() is called OK.");
				console.log(octopus.getData().bio.welcomeMessage);
        	},

        	education: function() {
				$("#education").append(HTMLschoolStart);

				for (var school in education.schools) {
					var formattedSchoolName = HTMLschoolName.replace("%data%", octopus.getData().education.schools[school].name);
					formattedSchoolName = formattedSchoolName.replace('<a href="#">', '<a href="' + octopus.getData().education.schools[school].url + '">');
					var formattedDates = HTMLschoolDates.replace("%data%", octopus.getData().education.schools[school].dates);
					var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", octopus.getData().education.schools[school].degree);
					var formattedMajors = HTMLschoolMajor.replace("%data%", octopus.getData().education.schools[school].majors[0]);
					var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", octopus.getData().education.schools[school].location)

					$(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree);
					$(".education-entry:last").append(formattedDates);
					$(".education-entry:last").append(formattedSchoolLocation);
					$(".education-entry:last").append(formattedMajors);
				}

				$(".education-entry:last").append(HTMLonlineClasses);

				for (var course in octopus.getData().education.onlineCourses) {
					var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", octopus.getData().education.onlineCourses[course].title);
					var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", octopus.getData().education.onlineCourses[course].school);
					var titlenSchool = formattedOnlineTitle + formattedOnlineSchool;
					var formattedOnlineDates = HTMLonlineDates.replace("%data%", octopus.getData().education.onlineCourses[course].dates);
					var formattedOnlineURL = HTMLonlineURL.replace("%data%", octopus.getData().education.onlineCourses[course].url);

					$(".education-entry:last").append(titlenSchool);
					// $("#education").append(formattedOnlineSchool);
					$(".education-entry:last").append(formattedOnlineDates);
					$(".education-entry:last").append(formattedOnlineURL);
				}

        	},

        	work: function() {
        		for (job in octopus.getData().work.jobs) {
					$("#workExperience").append(HTMLworkStart);
					var formattedEmployer = HTMLworkEmployer.replace("%data%", octopus.getData().work.jobs[job].employer);
					var formattedTitle = HTMLworkTitle.replace("%data%", octopus.getData().work.jobs[job].title);
					var formattedEmployerTitle = formattedEmployer + formattedTitle;
					var formattedLocation = HTMLworkLocation.replace("%data%", octopus.getData().work.jobs[job].location);
					var formattedDates = HTMLworkDates.replace("%data%", octopus.getData().work.jobs[job].dates);
					var formattedDescription = HTMLworkDescription.replace("%data%", octopus.getData().work.jobs[job].description);

					$(".work-entry:last").append(formattedEmployerTitle);
					$(".work-entry:last").append(formattedLocation);
					$(".work-entry:last").append(formattedDates);
					$(".work-entry:last").append(formattedDescription);
				}
        	},

        	project: function() {
        		$("#projects").append(HTMLprojectStart);

				for (project in octopus.getData().projects.projects) {
					var formattedProjectTitle = HTMLprojectTitle.replace("%data%", octopus.getData().projects.projects[project].title);
					var formattedProjectData = HTMLprojectDates.replace("%data%", octopus.getData().projects.projects[project].dates);
					var formattedProjectDescription = HTMLprojectDescription.replace("%data%", octopus.getData().projects.projects[project].description);

					$(".project-entry:last").append(formattedProjectTitle);
					$(".project-entry:last").append(formattedProjectData);
					$(".project-entry:last").append(formattedProjectDescription);

					for (var i in octopus.getData().projects.projects[project].images) {
						var formattedProjectImages = HTMLprojectImage.replace("%data%", octopus.getData().projects.projects[project].images[i]);
						$(".project-entry:last").append(formattedProjectImages);
					}
				}
        	},

        	googleMaps: function() {
        		$("#mapDiv").append(googleMap);

				$(document).click(function(loc) {
					console.log("X: " + loc.clientX + ", " + "Y: " + loc.clientY);
				});
        	}
        }
    };

    octopus.init();
});


// The old bio object

// Old bio data

// var bio = {
// 	"name": "Calvin Ku",
// 	"role": "Web Developer",
// 	"contacts": {
// 		"mobile": "+86 186 2030 9095",
// 		"email": "calvin.j.ku@outlook.com",
// 		"github": "savourylie",
// 		"twitter": "CalvinJianBaiKu",
// 		"location": "Shenzhen, China"
// 	},
// 	"welcomeMessage": "To infinity... and beyond!",
// 	"skills": ["awesomeness", "video game master", "being kind", "having a nice day"],
// 	"bioPic": "images/me.jpg"
// }

// Old Bio display function

// bio.display = function() {

// 	var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
// 	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
// 	var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
// 	var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
// 	var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

// 	// Top Contatcts
// 	$('#topContacts').append(formattedMobile);
// 	$('#topContacts').append(formattedEmail);
// 	$('#topContacts').append(formattedGithub);
// 	$('#topContacts').append(formattedTwitter);
// 	$('#topContacts').append(formattedLocation);


// 	// Footer Contacts
// 	$('#footerContacts').append(formattedMobile);
// 	$('#footerContacts').append(formattedEmail);
// 	$('#footerContacts').append(formattedGithub);
// 	$('#footerContacts').append(formattedTwitter);
// 	$('#footerContacts').append(formattedLocation);

// 	var formattedMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
// 	var formattedImage = HTMLbioPic.replace("%data%", bio.bioPic);
// 	$("#header").append(formattedImage);
// 	$('#header').append(formattedMessage);
// 	$("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
// 	$("#header").prepend(HTMLheaderName.replace("%data%", bio.name));

// 	if (bio.skills.length !== 0) {
// 		$("#header").append(HTMLskillsStart);
// 		for (var skill in bio.skills) {
// 			$("#skills").append(HTMLskills.replace("%data%", bio.skills[skill]));
// 		}
// 	}

// };

// The education object

// Old Education Data

// var education = {
// 	"schools": [
// 		{
// 			"name": "University of East Anglia",
// 			"location": "Norwich, UK",
// 			"degree": "MSc",
// 			"majors": ["Mathematics"],
// 			"dates": 2009,
// 			'url': "http://www.uea.ac.uk/"
// 		},
// 		{
// 			"name": "National Cheng Kung Univeristy",
// 			"location": "Tainan, Taiwan",
// 			"degree": "BEng",
// 			"majors": ["Aeronautics and Astronautics"],
// 			"dates": 2006,
// 			'url': "http://web.ncku.edu.tw/"
// 		},
// 		{
// 			"name": "Rubbish School",
// 			"location": "Los Angeles, US",
// 			"degree": "BS",
// 			"majors": ["B*llshitology"],
// 			"dates": 3001,
// 			'url': "http://www.stanford.edu/"
// 		}
// 	],

// 	"onlineCourses": [
// 		{
// 			"title": "Machine Learning",
// 			"school": "Coursera",
// 			"dates": 2014,
// 			"url": "http://www.coursera.com"
// 		}
// 	]
// };

// Old Education display function

// education.display = function() {
// 	$("#education").append(HTMLschoolStart);

// 	for (var school in education.schools) {
// 		var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
// 		formattedSchoolName = formattedSchoolName.replace('<a href="#">', '<a href="' + education.schools[school].url + '">');
// 		var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
// 		var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
// 		var formattedMajors = HTMLschoolMajor.replace("%data%", education.schools[school].majors[0]);
// 		var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location)

// 		$(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree);
// 		$(".education-entry:last").append(formattedDates);
// 		$(".education-entry:last").append(formattedSchoolLocation);
// 		$(".education-entry:last").append(formattedMajors);
// 	}

// 	$(".education-entry:last").append(HTMLonlineClasses);

// 	for (var course in education.onlineCourses) {
// 		var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
// 		var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
// 		var titlenSchool = formattedOnlineTitle + formattedOnlineSchool;
// 		var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
// 		var formattedOnlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[course].url);

// 		$(".education-entry:last").append(titlenSchool);
// 		// $("#education").append(formattedOnlineSchool);
// 		$(".education-entry:last").append(formattedOnlineDates);
// 		$(".education-entry:last").append(formattedOnlineURL);
// 	}
// };

// The work object

// Old Work data

// var work = {};

// work.jobs = [
// 	{
// 		"employer": "Medici Software",
// 		"title": "AI Engineer",
// 		"location": "London, UK",
// 		"dates": "March, 2014 - May, 2015",
// 		"description": "AI stuff"
// 	},
// 	{
// 		"employer": "ChinaStepOne",
// 		"title": "Slacker",
// 		"location": "Shenzhen, China",
// 		"dates": "Nov, 2011 - April, 2013",
// 		"description": "Started being a slacker at CSO from Jul, 2015"
// 	},
// 	{
// 		"employer": "National Tainan Institute of Nursing",
// 		"title": "Teacher",
// 		"location": "Tainan, Taiwan",
// 		"dates": "Feb - Jun, 2010",
// 		"description": "Taught English conversation ans stuff"
// 	}
// ];

// Old Work display function

// work.display = function() {
// 	for (job in work.jobs) {
// 		$("#workExperience").append(HTMLworkStart);
// 		var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
// 		var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
// 		var formattedEmployerTitle = formattedEmployer + formattedTitle;
// 		var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
// 		var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
// 		var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);

// 		$(".work-entry:last").append(formattedEmployerTitle);
// 		$(".work-entry:last").append(formattedLocation);
// 		$(".work-entry:last").append(formattedDates);
// 		$(".work-entry:last").append(formattedDescription);
// 	}
// };

// The project object

// Old Project data

// var projects = {};

// projects.projects = [
// 		{
// 			"title": "LifeInShenzhen",
// 			"dates": "Nov, 2011 - Feb, 2012",
// 			"description": "Provide foreigners in Shenzhen services that are essential to their day to day life.",
// 			"images": ["http://placehold.it/350x150", "http://placekitten.com/g/150/150"]
// 		},
// 		{
// 			"title": "WorkInShenzhen",
// 			"dates": "Nov, 2011 - Feb, 2012",
// 			"description": "Provide foreigners in Shenzhen services that are essential in their day to day work.",
// 			"images": ["http://placehold.it/350x150", "http://placekitten.com/g/150/150"]
// 		}
// ];

// Old Project display function

// projects.display = function() {
// 	$("#projects").append(HTMLprojectStart);
// 	for (project in projects.projects) {
// 		var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
// 		var formattedProjectData = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
// 		var formattedProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);

// 		$(".project-entry:last").append(formattedProjectTitle);
// 		$(".project-entry:last").append(formattedProjectData);
// 		$(".project-entry:last").append(formattedProjectDescription);

// 		for (var i in projects.projects[project].images) {
// 			var formattedProjectImages = HTMLprojectImage.replace("%data%", projects.projects[project].images[i]);
// 			$(".project-entry:last").append(formattedProjectImages);
// 		}
// 	}

// };

// Old -- Invoking the display functions

// bio.display();
// education.display();
// work.display();
// projects.display();

//Google Maps

// $("#mapDiv").append(googleMap);

// $(document).click(function(loc) {
// 	console.log("X: " + loc.clientX + ", " + "Y: " + loc.clientY);
// });

