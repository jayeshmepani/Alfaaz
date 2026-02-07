import os

# Directory containing fonts
font_dir = r"assets/fonts/bulk"
output_file = "fonts_preview.html"

# The quote requested by the user (Unicode)
quote_html = """
<blockquote class="hero-quote" lang="hi">
    शब्दों में ढली वो खामोशियाँ,<br>
    जो दिल में बसी थीं सालों से।
</blockquote>
"""

# ASCII Text (Test for Legacy Fonts like Preeti)
# "mero nam" in Preeti is roughly ";]/F gfd" or similar mapping. 
# We'll use a string that produces visible changes in legacy fonts.
# "ka" in Preeti is "k". "kha" is "v". "ga" is "u".
legacy_test = """
<div class="legacy-test">
    Legacy Test (ASCII 'k m o'): k m o <br>
    Legacy Test (ASCII 'cf km sf'): cf km sf
</div>
"""

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bulk Font Preview</title>
    <style>
        body {{
            background-color: #1a1614;
            color: #e8e4dc;
            font-family: 'Inter', sans-serif;
            padding: 2rem;
        }}
        .font-card {{
            border: 1px solid #333;
            padding: 2rem;
            margin-bottom: 2rem;
            border-radius: 12px;
            background: #221e1b;
        }}
        .font-name {{
            font-size: 0.9rem;
            color: #888;
            margin-bottom: 1rem;
            font-family: monospace;
        }}
        .hero-quote {{
            font-size: 2rem;
            line-height: 1.6;
            margin: 0;
            border-left: 3px solid #c4a87c;
            padding-left: 1rem;
        }}
        .legacy-test {{
            margin-top: 1rem;
            font-size: 1.5rem;
            color: #aaa;
            border-top: 1px dashed #444;
            padding-top: 0.5rem;
        }}
    </style>
</head>
<body>
    <h1>Downloaded Fonts Preview</h1>
    <p>Showing {len([name for name in os.listdir(font_dir) if name.lower().endswith(".ttf")])} fonts</p>
    <div id="font-list">
"""

try:
    # Walk through the directory
    for filename in os.listdir(font_dir):
        if filename.lower().endswith(".ttf"):
            font_name = os.path.splitext(filename)[0]
            # Create a safe font-family name
            clean_font_name = font_name.replace(" ", "_").replace("-", "_")
            
            # CSS for this font
            html_content += f"""
            <style>
                @font-face {{
                    font-family: '{clean_font_name}';
                    src: url('assets/fonts/bulk/{filename}') format('truetype');
                    font-display: swap;
                }}
            </style>
            
            <div class="font-card">
                <div class="font-name">{filename}</div>
                <div style="font-family: '{clean_font_name}';">
                    {quote_html}
                    {legacy_test}
                </div>
            </div>
            """

    html_content += """
    </div>
</body>
</html>
"""

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"Successfully generated {output_file}")

except Exception as e:
    print(f"Error generating preview: {e}")
