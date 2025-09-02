//@ts-check

export async function addScreenshotToReport(testInfo, page, name='page') {
  const screenshot = await page.screenshot();
  await testInfo.attach(name, {
    body: screenshot,
    contentType: 'image/png'
  });
}

