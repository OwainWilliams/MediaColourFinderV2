# Enhanced Media Colour Picker V2 - Focal Point Color Extraction

## Overview

The Media Colour Picker V2 has been enhanced to provide more specific color extraction using a 10-pixel radius around the image's focal point. This allows for more targeted color analysis rather than analyzing the entire image.

## Features

### Focal Point-Based Color Extraction

When an image has a defined focal point (set using Umbraco's image cropper), the color picker will:

1. **Extract colors from a 10px radius** around the focal point coordinates
2. **Calculate average color** from all pixels in that specific area
3. **Find the brightest color** within the focal area
4. **Generate opposite/complementary colors** based on the focal area
5. **Determine optimal text color** for contrast against the focal area colors

### Fallback Behavior

If no focal point is explicitly set (defaults to center: 50%, 50%) or if focal point data is unavailable, the system falls back to the original ColorThief behavior that analyzes the entire image.

## Visual Indicators

The interface now shows:
- **Target icon** 🎯 when using focal point-based extraction with coordinates
- **Palette icon** 🎨 when using full-image analysis
- **Focal point percentage** displayed when using targeted extraction

## Technical Implementation

### Key Methods

#### `#extractColorsFromFocalArea(image, focalPoint)`
- Creates a canvas context to access raw image data
- Converts focal point percentages to pixel coordinates
- Extracts a 20x20 pixel area (10px radius) around the focal point
- Processes pixel data to calculate average and brightest colors
- Generates a diverse color palette from the focal area

#### Enhanced Color Analysis
- **Average Color**: Mathematical average of all RGB values in the focal area
- **Brightest Color**: Color with highest luminance value in the focal area  
- **Opposite Color**: Calculated inverse of the average color
- **Text Color**: Black or white based on contrast ratio with average color

### Color Calculations

The enhanced implementation provides four distinct color values:

1. **Average**: `#RRGGBB` - Mean RGB values from focal area
2. **Brightest**: `#RRGGBB` - Highest luminance color in focal area
3. **Opposite**: `#RRGGBB` - Inverted RGB values of average color
4. **Text Color**: `#000000` or `#FFFFFF` - Optimal contrast for readability

## Usage

### Setting Focal Points

1. In Umbraco backoffice, edit a media item with an image
2. Use the Image Cropper property editor
3. Click and drag to set the focal point on your image
4. Save the media item

### Viewing Color Results

1. Navigate to the media item
2. View the "Colour Finder" property
3. Observe the visual indicator showing extraction method
4. See the four generated color swatches

### Integration

The color values are stored as JSON and can be accessed in your templates:

```csharp
// Example usage in Razor template
var colorData = Model.Value<string>("colourFinder");
// Parse JSON to access individual color values
```

## Benefits

- **More Relevant Colors**: Focus on the most important part of your image
- **Better Design Integration**: Colors that represent the main subject matter
- **Improved Consistency**: Consistent color extraction from focal areas
- **Visual Feedback**: Clear indication of extraction method and focal coordinates

## Browser Support

This enhancement uses standard HTML5 Canvas APIs and is supported in all modern browsers. The implementation gracefully falls back to full-image analysis if any errors occur during focal point processing.