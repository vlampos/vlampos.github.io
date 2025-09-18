// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-team",
          title: "team",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/team/";
          },
        },{id: "nav-join",
          title: "join",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/join/";
          },
        },{id: "nav-repos",
          title: "repos",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repos/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/large_001/";
            },},{id: "news-our-paper-titled-tracking-covid-19-using-online-search-has-been-published-in-npj-digital-medicine-ucl-news-new-york-times-bbc",
          title: 'Our paper titled “Tracking COVID-19 using online search” has been published in npj...',
          description: "",
          section: "News",},{id: "news-our-paper-titled-an-artificial-intelligence-approach-for-selecting-effective-teacher-communication-strategies-in-autism-education-has-been-published-in-npj-science-of-learning-ucl-news",
          title: 'Our paper titled “An artificial intelligence approach for selecting effective teacher communication strategies...',
          description: "",
          section: "News",},{id: "news-our-paper-titled-neural-network-models-for-influenza-forecasting-with-associated-uncertainty-using-web-search-activity-trends-has-been-published-in-plos-computational-biology",
          title: 'Our paper titled “Neural network models for influenza forecasting with associated uncertainty using...',
          description: "",
          section: "News",},{id: "news-our-paper-titled-deformtime-capturing-variable-dependencies-with-deformable-attention-for-time-series-forecasting-has-been-published-in-the-transactions-on-machine-learning-research-tmlr",
          title: 'Our paper titled “DeformTime: capturing variable dependencies with deformable attention for time series...',
          description: "",
          section: "News",},{id: "news-our-paper-machine-generated-text-detection-prevents-language-model-collapse-has-been-accepted-by-emnlp-2025-main",
          title: 'Our paper Machine-generated text detection prevents language model collapse has been accepted by...',
          description: "",
          section: "News",},{id: "news-our-project-foundation-models-for-sequential-predictions-has-been-awarded-10-000-gpuh-on-the-isambard-ai-airr-service",
          title: 'Our project “Foundation models for sequential predictions” has been awarded 10,000 GPUh on...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
