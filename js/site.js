//get blogs from the api
function fetchBlogData() {
  const baseURL = "https://ecd-blog.herokuapp.com";
  const baseAPIURL = `${baseURL}/api/`;
  const baseContentURL = `${baseURL}/content/`;

  fetch(`${baseAPIURL}BlogPosts?num=1`)
    .then((response) => response.json())
    .then(function (data) {
      displayBlogs(data, baseContentURL);
    });
}

//this will display the blogs on the page
function displayBlogs(data, baseContentURL) {
  let template = document.getElementById("blog-template");
  let blogSection = document.getElementById("blogs");

  /* 
  "title": "string",
  "slug": "string",
  "abstract": "string",
  "content": "string",
  "created": "2022-08-24",
  "updated": "2022-08-24",  
  "imageData": "string",
  "imageType": "string",
  */

  data.forEach((article) => {
    const articleCard = document.importNode(template.content, true);

    //format the image tag
    let imageDiv = articleCard.querySelector(`[data-blog="imageLink"]`);
    imageDiv.setAttribute("href", `${baseContentURL}${article.slug}`);

    let imgTag = document.createElement("img");
    imgTag.setAttribute(
      "src",
      `data:${article.imageType};base64,${article.imageData}`
    );
    imgTag.classList.add("blog-image");
    imageDiv.appendChild(imgTag);

    let blogDate = new Date(article.created);
    let blogDay = blogDate.getDate();
    let blogMonth = blogDate.toLocaleString("default", { month: "long" });

    //format blog day
    blogDayDiv = articleCard.querySelector(`[data-blog="day"]`);
    blogDayDiv.innerHTML = blogDay;

    //format the blog month
    blogMonthDiv = articleCard.querySelector(`[data-blog="month"]`);
    blogMonthDiv.innerHTML = blogMonth;

    //format the blog title
    blogTitleDiv = articleCard.querySelector(`[data-blog="title"]`);
    blogTitleDiv.innerHTML = article.title;

    //format the blog content
    blogContentDiv = articleCard.querySelector(`[data-blog="content"]`);
    blogContentDiv.innerHTML = article.content;

    //format the read more link
    blogLink = articleCard.querySelector(`[data-blog="readMoreLink"]`);
    blogLink.setAttribute("href", `${baseContentURL}${article.slug}`);

    blogPubDate = articleCard.querySelector(`[data-blog="publishedDate"]`);

    dateToday = new Date();
    updatedDate = new Date(
      article.updated != null ? article.updated : article.created
    );
    diffTime = Math.abs(dateToday.getTime() - updatedDate.getTime());
    lastUpdated = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (lastUpdated == 1) {
      blogPubDate.innerHTML = `Updated ${lastUpdated} day ago`;
    } else {
      blogPubDate.innerHTML = `Updated ${lastUpdated} days ago`;
    }

    blogSection.appendChild(articleCard);
  });
}
