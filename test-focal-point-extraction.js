// Test file to verify focal point color extraction logic
// This can be run in browser console for testing

function testFocalPointColorExtraction() {
    // Test parameters
    const testCases = [
        {
            focalPoint: { left: 0.5, top: 0.5 }, // Center
            imageWidth: 400,
            imageHeight: 300,
            description: "Center focal point"
        },
        {
            focalPoint: { left: 0.2, top: 0.3 }, // Upper left area
            imageWidth: 400,
            imageHeight: 300,
            description: "Upper left focal point"
        },
        {
            focalPoint: { left: 0.8, top: 0.7 }, // Lower right area
            imageWidth: 400,
            imageHeight: 300,
            description: "Lower right focal point"
        },
        {
            focalPoint: { left: 0.0, top: 0.0 }, // Edge case - top left corner
            imageWidth: 400,
            imageHeight: 300,
            description: "Edge case - corner"
        },
        {
            focalPoint: { left: 1.0, top: 1.0 }, // Edge case - bottom right corner
            imageWidth: 400,
            imageHeight: 300,
            description: "Edge case - opposite corner"
        }
    ];

    console.log("=== Focal Point Color Extraction Tests ===");
    
    testCases.forEach((testCase, index) => {
        const { focalPoint, imageWidth, imageHeight, description } = testCase;
        
        // Calculate focal point coordinates in pixels (same logic as our implementation)
        const focalX = Math.round(focalPoint.left * imageWidth);
        const focalY = Math.round(focalPoint.top * imageHeight);
        
        // Define the extraction area (10px radius = 20x20 square)
        const radius = 10;
        const startX = Math.max(0, focalX - radius);
        const startY = Math.max(0, focalY - radius);
        const width = Math.min(radius * 2, imageWidth - startX);
        const height = Math.min(radius * 2, imageHeight - startY);
        
        console.log(`\nTest ${index + 1}: ${description}`);
        console.log(`  Focal Point: (${focalPoint.left * 100}%, ${focalPoint.top * 100}%)`);
        console.log(`  Pixel Coordinates: (${focalX}px, ${focalY}px)`);
        console.log(`  Extraction Area: ${startX},${startY} to ${startX + width},${startY + height}`);
        console.log(`  Area Size: ${width}x${height} pixels`);
        console.log(`  Total Pixels: ${width * height}`);
        
        // Verify extraction area is valid
        const isValid = startX >= 0 && startY >= 0 && 
                       startX + width <= imageWidth && 
                       startY + height <= imageHeight &&
                       width > 0 && height > 0;
        
        console.log(`  Valid Area: ${isValid ? '✓' : '✗'}`);
        
        if (!isValid) {
            console.warn(`  Warning: Invalid extraction area for ${description}`);
        }
    });
    
    console.log("\n=== Test Summary ===");
    console.log("All focal point calculations completed.");
    console.log("Check for any warnings above.");
    console.log("The 10px radius extraction should work for all standard focal points.");
}

// Run the test
testFocalPointColorExtraction();