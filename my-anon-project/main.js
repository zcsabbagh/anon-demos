



import { AnonRuntime } from "@anon/sdk-typescript";
const anon = new AnonRuntime({ apiKey: "anon_gBUX6mdo0hOrxv31icHAHJf8FzEK3if/++9EIC02hqc/yZRnaMo9s6G+7SitO2JgD8yPUCubIyVdV3Ux" });

// The username of the user whose account to use
const appUserId = "zane@team.anon.com";
// The app sessions to inject
const apps = ["twitter", "instagram", "linkedin"];
const caption = "I <3 Team Anon";
const imageUrl = 'https://media.licdn.com/dms/image/v2/D560BAQGBIUmdhhxTPA/company-logo_200_200/company-logo_200_200/0/1730930848449/anon_dot_com_logo?e=1740614400&v=beta&t=lNZ2CNaoyDDX1dPZPVtLyBxRVzWALv-DPvoSJIyuE4w';
const imageUrl2 = 'https://pbs.twimg.com/profile_images/1858592872586752000/X1-sXNb5_400x400.jpg';

const downloadImage = async (url) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
};


const imageBuffer = await downloadImage(imageUrl2);
console.log("Past imageBuffer")

// const postToLinkedIn = async (page) => {
//   await page.goto("https://linkedin.com");

//   // Wait for and click the "Start a post" button
//   await page.waitForSelector('#ember30.artdeco-button--tertiary');
//   await page.click('#ember30.artdeco-button--tertiary');
//   await page.waitForTimeout(2000);

//   // Find and fill in the caption text area
//   await page.waitForSelector('div[data-test-ql-editor-contenteditable="true"]');
//   await page.type('div[data-test-ql-editor-contenteditable="true"]', caption);
//   await page.waitForTimeout(2000);

//   // Wait for and click the media upload button
//   await page.waitForSelector('button[aria-label="Add media"]');
//   await page.click('button[aria-label="Add media"]');
//   await page.waitForTimeout(2000);

//   // Handle file upload using the downloaded image
//   const fileInput = await page.$('input[type="file"]');
//   await fileInput.setInputFiles({
//     name: 'image.jpg',
//     mimeType: 'image/jpeg',
//     buffer: imageBuffer
//   });

//   await page.waitForTimeout(2000);
//   // Click the Next button
//   await page.waitForSelector('button[aria-label="Next"].artdeco-button--primary');
//   await page.click('button[aria-label="Next"].artdeco-button--primary');
//   await page.waitForTimeout(2000);

//   // Click the "Post" button
//   await page.waitForSelector('button.share-actions__primary-action.artdeco-button--primary');
//   await page.click('button.share-actions__primary-action.artdeco-button--primary');
//   await page.waitForTimeout(2000);

// }

const postToInstagram = async (page) => {
  await page.goto("https://instagram.com");

  // Wait for the create button to be visible and click it
  await page.waitForSelector('svg[aria-label="New post"]');
  await page.click('svg[aria-label="New post"]');
  
  // Wait for the Post button to appear and click it
  await page.waitForSelector('svg[aria-label="Post"]');
  await page.click('svg[aria-label="Post"]');
  await page.waitForTimeout(2000);

  // Click upload image
  await page.waitForSelector('button:has-text("Select from computer")');
  await page.click('button:has-text("Select from computer")');
  await page.waitForTimeout(2000);


  // Handle file upload using the downloaded image
  const fileInput = await page.$('input[type="file"]');
  await fileInput.setInputFiles({
    name: 'image.jpg',
    mimeType: 'image/jpeg',
    buffer: imageBuffer
  });
  await page.waitForTimeout(2000);

  // Click the Next button twice
  await page.waitForSelector('div[role="button"]:has-text("Next")');
  await page.click('div[role="button"]:has-text("Next")');
  await page.waitForTimeout(1000);
  await page.waitForSelector('div[role="button"]:has-text("Next")');
  await page.click('div[role="button"]:has-text("Next")');
  await page.waitForTimeout(2000);

  // Write a caption
  await page.fill('div[aria-label="Write a caption..."]', caption);

  // Click the Share button
  await page.waitForSelector('div[role="button"]:has-text("Share")');
  await page.click('div[role="button"]:has-text("Share")');
  await page.waitForTimeout(2000);
}

// const postToTwitter = async (page) => {
//   await page.goto("https://x.com");

//     // Wait for 3 seconds before clicking post button
//     await page.waitForTimeout(3000);
    
//     // Click the post/tweet button using the provided data-testid
//     await page.waitForSelector('[data-testid="SideNav_NewTweet_Button"]');
//     await page.click('[data-testid="SideNav_NewTweet_Button"]');

//     await page.waitForTimeout(2000);
//     // Type the tweet text
//     await page.fill('[data-testid="tweetTextarea_0"]', caption);
//     await page.waitForTimeout(1000);

//     // Click the media button
//     await page.waitForSelector('[aria-label="Add photos or video"]');
//     await page.click('[aria-label="Add photos or video"]');
//     await page.waitForTimeout(2000);
//     const fileInput = await page.$('input[type="file"]');
//     await fileInput.setInputFiles({
//       name: 'image.jpg',
//       mimeType: 'image/jpeg',
//       buffer: imageBuffer
//     });
//     await page.waitForTimeout(2000);

//     // Click the Post button
//     await page.waitForSelector('[data-testid="tweetButton"]');
//     await page.click('[data-testid="tweetButton"]');
//     await page.waitForTimeout(2000);
// }

const action = async (page) => {
    console.log("Posting to Instagram")
    await postToInstagram(page);
    // await postToTwitter(page);    
    // await postToLinkedIn(page);
}

console.log("Running action")
const { result, liveStreamingUrl } = await anon.run({
  appUserId,
  apps,
  action
});

// You can use the liveStreamingUrl to watch your action be performed.
console.log(liveStreamingUrl)

// Await the successful completion of the action
await result;
