
# Function to normalize text (e.g., fixing special Unicode characters)
def normalize_text(text):
    replacements = {
        "\uffff": "ff",  # Placeholder, replace with actual Unicode mappings
        "\ufb01": "fi",
        "\ufb02": "fl",
        "\u2013": "-",  # En dash
        "\u2019": "'",  # Right single quotation mark
        # Add more replacements as needed
    }
    for unicode_char, replacement in replacements.items():
        text = text.replace(unicode_char, replacement)
    return text
