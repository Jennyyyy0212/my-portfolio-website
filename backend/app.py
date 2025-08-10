import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

hero_info = {
    "name": "Jenny Cheng",
    "intro": "I'm a Software Engineering master at the UCI. Currently seeking W26/S26 SWE internship opportunities. I believe in creating software that is not only functional but also clean, beautiful, and enjoyable to use. Let's build something together that inspires.",
    "email": "jennyc28@uci.edu",
    "linkedin": "https://www.linkedin.com/in/an-chieh-cheng",
}

about_info = {
    "name": "Jenny Cheng",
    "bio": "I'm a software engineer passionate about AI and full-stack development.",
    "location": "San Francisco, CA",
    "title": ["Software Engineer", "Software Developer"],
    "interests": ["AI", "Web Dev", "Hackathons", "Startups"],
    "photo_url": "profile.jpg",
}

experiences_data = [
    {
        "job_title": "Production Engineer Intern",
        "date": "2025 - Present",
        "location": "Remote, CA",
        "company_name": "Meta x MLH Fellowship",
        "company_logo": "facebook-logo.jpeg",
        "company_link": "https://opensource.fb.com/partnerships/major-league-hacking/",
        "tech_stack": ["Python", "Flask", "Docker", "Linux", "Bash", "React"],
        "description": "Focused on improving system reliability and developer workflows through production engineering practices.",
        "details": {
            "bullets": [
                "Designed and implemented logging, monitoring, and alerting for Flask-based backend services using open-source tooling.",
                "Containerized full-stack applications with Docker and managed multi-service environments via Docker Compose.",
                "Wrote shell scripts to automate testing, deployment, and log analysis on Linux-based environments.",
                "Improved CI/CD pipelines and reduced production deployment time by over 30%.",
                "Collaborated with fellows and mentors from Meta to debug performance issues and conduct incident response simulations.",
            ]
        },
    },
    {
        "job_title": "Data Operator",
        "date": "2024 - 2024",
        "location": "Mountain View, CA",
        "company_name": "Athelas / Commure",
        "company_logo": "commure-logo.jpeg",
        "company_link": "https://www.athelas.com/",
        "tech_stack": ["Python", "SQL", "Data Analytics"],
        "description": "Supported backend workflows and helped improve the accuracy and efficiency of patient data processing systems.",
        "details": {
            "bullets": [
                "Reviewed and validated large volumes of healthcare data across multiple hospital systems.",
                "Automated the inconsistency checking process using Python and solved around 80% of repetive tasks, reducing manual review effort",
                "Worked closely with engineers to debug data pipeline issues and propose improvements.",
            ]
        },
    },
    {
        "job_title": "Marketing Engineer",
        "date": "2023 - 2024",
        "location": "San Jose, CA",
        "company_name": "ABConvert",
        "company_logo": "abconvert-logo.jpeg",
        "company_link": "https://www.abconvert.io/",
        "tech_stack": ["Python", "LLM", "OpenAI", "Pandas"],
        "description": "Built AI tools to optimize marketing campaigns through data analysis, automation, and content generation.",
        "details": {
            "bullets": [
                "Developed Python pipelines to analyze and segment marketing performance data using Pandas.",
                "Built prompt-based GPT tools that generated headlines, CTAs, and ad copy tailored to different user segments.",
                "Fine-tuned content generation using A/B testing results to improve engagement metrics.",
                "Collaborated with the marketing and engineering teams to launch LLM-based internal tools.",
                "Reduced manual campaign iteration time by over 50% through automation and insight generation.",
            ]
        },
    },
]

education_data = [
    {
        "degree": "M.Sc. Software Engineering",
        "date": "2014 - Present",
        "location": "Irvine, CA",
        "institution_name": "University of California, Irvine",
        "institution_logo": "uci-logo.jpeg",
        "institution_link": "https://uci.edu/",
        "description": "Graduate program focused on scalable systems, backend development, and engineering best practices. Collaborating on real-world projects with a strong emphasis on infrastructure and testing.",
    },
    {
        "degree": "B.Sc. Business Analytics",
        "date": "2019 - 2023",
        "location": "San Jose, CA",
        "institution_name": "San Jose State University",
        "institution_logo": "sjsu-logo.png",
        "institution_link": "https://www.sjsu.edu/",
        "description": "Studied data analytics, statistics, and business strategy with hands-on projects in machine learning and data visualization. Minor in CS. Graduated with honors.",
    },
]

hobbies = [
    {
        "name": "Foodie",
        "image": "/static/img/food.jpg",
        "color": "#B39DDB",
        "label": "Foodie",
    },
    {
        "name": "Driving",
        "image": "/static/img/drive.jpg",
        "color": "#9575CD",
        "label": "Driving",
    },
    {"name": "Tech", "image": "wifi.png", "color": "#7E57C2", "label": "Tech"},
    {"name": "Design", "color": "#673AB7", "label": "Design"},
    {
        "name": "Fitness",
        "image": "/static/img/gym.jpg",
        "color": "#5E35B1",
        "label": "Fitness",
    },
    {"name": "Cafe", "color": "#512DA8", "label": "Coffee Time"},
]

projects = [
    {
        "title": "Smart Bookmark",
        "subtitle": "AI Bookmark Organizer",
        "description": "A Chrome extension that uses Gemini to summarize and tag saved URLs, then automatically sorts them into folders based on content.",
        "image_url": "/static/img/bookmark-screen.png",
        "link": "https://github.com/Jennyyyy0212/bookmark-organizer",
        "tags": ["Chrome Extension", "Gemini", "AI", "JavaScript"],
    },
    {
        "title": "Summailize",
        "subtitle": "Gmail Digest Generator",
        "description": "A Gmail extension that summarizes unread emails using AI and stores digest in Firestore, with support for both per-email and full summary views.",
        "image_url": "/static/img/summailize-screen.png",
        "link": "https://github.com/lydia-yan/Summailize",
        "tags": ["Python", "Flask", "OpenAI", "Gmail API", "Firebase"],
    },
    {
        "title": "BreedFinder",
        "subtitle": "Dog Breed Identifier App",
        "description": "An iOS app that uses a ResNet50 model to identify dog breeds from photos with high accuracy. Built with a FastAPI backend and a SwiftUI interface, trained on 70+ breeds.",
        "image_url": "/static/img/breedfinder-screen.png",
        "link": "https://github.com/lydia-yan/BreedFinder",
        "tags": ["iOS", "Swift", "Machine Learning", "FastAPI", "Python"],
    },
    {
        "title": "IntelliView",
        "subtitle": "Mock Interview AI Agent",
        "description": "Built with Google’s AI Agent Development Kit, this tool conducts real-time mock interviews, transcribes sessions, and summarizes answers using Gemini. Help the users to better prepare their interview.",
        "image_url": "/static/img/intelliview-screen.png",
        "link": "https://github.com/lydia-yan/Intelliview",
        "tags": [
            "Gemini",
            "Google ADK",
            "FastAPI",
            "WebSocket",
            "Streaming",
            "Python",
            "Flutter",
        ],
    },
    {
        "title": "TeamCAST",
        "subtitle": "Team Contribution Tracker",
        "description": "An activity tracking tool that helps instructors monitor team collaboration by visualizing GitHub PRs and submitted work. Contributed GitHub and Google Doc plugins to support automated updates and content sync.",
        "image_url": "/static/img/teamcast-screen.png",
        "link": "https://github.com/jennyycheng/teamcast",
        "tags": ["React", "Firebase", "GitHub API", "Google Doc API", "Tailwind CSS"],
    },
]

skills = [
    {"name": "Linux", "filename": "/static/img/icon/Linux.png"},
    {"name": "Docker", "filename": "/static/img/icon/Docker.png"},
    {"name": "Python", "filename": "/static/img/icon/Python.png"},
    {"name": "React", "filename": "/static/img/icon/React.png"},
    {"name": "JavaScript", "filename": "/static/img/icon/Javascript.png"},
    {"name": "Java", "filename": "/static/img/icon/Java.png"},
    {"name": "Google ADK", "filename": "/static/img/icon/Google-adk.png"},
    {"name": "MongoDB", "filename": "/static/img/icon/Mongodb.png"},
    {"name": "Markdown", "filename": "/static/img/icon/Markdown.png"},
    {"name": "Flutter", "filename": "/static/img/icon/Flutter.png"},
    {"name": "FastAPI", "filename": "/static/img/icon/Fastapi.png"},
    {"name": "Flask", "filename": "/static/img/icon/Flask.png"},
    {"name": "GitHub", "filename": "/static/img/icon/Github.png"},
    {"name": "Git", "filename": "/static/img/icon/Git.png"},
    {"name": "Firebase", "filename": "/static/img/icon/Firebase.png"},
    {"name": "Dart", "filename": "/static/img/icon/Dart.png"},
    {"name": "Azure", "filename": "/static/img/icon/Azure.png"},
    {"name": "Android", "filename": "/static/img/icon/Android.png"},
]


@app.route("/api/data")
def get_all_data():
    return jsonify(
        {
            "hero": hero_info,
            "about": about_info,
            "experiences": experiences_data,
            "education": education_data,
            "projects": projects,
            "hobbies": hobbies,
            "skills": skills,
            "map": {
                "mapbox_token": "pk.eyJ1IjoiamVubnl5eXkwMjEyIiwiYSI6ImNtY3RvZTNkNDAwZzgyd3B5cmxvb2FzeTgifQ.OX0MjKAR_xr1lP8gAAYJKw",
                "locations": [
                    {"title": "Irvine, CA", "coords": [-117.8265, 33.6846]},
                    {"title": "San Jose, CA", "coords": [-121.8863, 37.3382]},
                    {"title": "Lake Tahoe, CA", "coords": [-120.0440, 39.0968]},
                    {"title": "Taiwan", "coords": [121.5654, 25.0330]},
                    {"title": "Hong Kong", "coords": [114.1694, 22.3193]},
                    {"title": "Shenzhen, China", "coords": [114.0579, 22.5431]},
                    {"title": "Yunnan, China", "coords": [102.7123, 25.0406]},
                    {"title": "Zhejiang, China", "coords": [120.1551, 30.2741]},
                    {"title": "Zhejiang, China", "coords": [120.1551, 30.2741]},
                    {"title": "Seattle, WA", "coords": [-122.3321, 47.6062]},
                    {"title": "Portland, OR", "coords": [-122.6765, 45.5231]},
                    {"title": "Las Vegas, NV", "coords": [-115.1398, 36.1699]},
                ],
            },
        }
    )


@app.route("/api/hero")
def get_hero():
    return jsonify(hero_info)


@app.route("/api/about")
def get_about():
    return jsonify(about_info)


@app.route("/api/experiences")
def get_experiences():
    return jsonify(experiences_data)


@app.route("/api/education")
def get_education():
    return jsonify(education_data)


@app.route("/api/projects")
def get_projects():
    return jsonify(projects)


@app.route("/api/hobbies")
def get_hobbies():
    return jsonify(hobbies)


@app.route("/api/skills")
def get_skills():
    return jsonify(skills)
