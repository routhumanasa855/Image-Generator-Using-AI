app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;
  console.log("Prompt received:", prompt); // Log prompt

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "512x512",
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data); // Log full response

    if (data.data && data.data.length > 0) {
      res.json({ url: data.data[0].url });
    } else {
      res.status(500).json({ error: "No image returned" });
    }
  } catch (err) {
    console.error("Error generating image:", err);
    res.status(500).json({ error: "Image generation failed" });
  }
});
