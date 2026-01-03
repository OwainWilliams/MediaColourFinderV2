# Media Colour Finder V2

[![Downloads](https://img.shields.io/nuget/dt/OC.MediaColourFinderV2?color=cc9900)](https://www.nuget.org/packages/OC.MediaColourFinderV2/)
[![NuGet](https://img.shields.io/nuget/vpre/OC.MediaColourFinderV2?color=0273B3)](https://www.nuget.org/packages/OC.MediaColourFinderV2/)
[![GitHub license](https://img.shields.io/github/license/OwainWilliams/OC.MediaColourFinderV2?color=8AB803)](../LICENSE)

Add this property editor to an Image Media Type in Umbraco to automatically extract colour information from your images.

<!--
Including screenshots is a really good idea! 

If you put images into /docs/screenshots, then you would reference them in this readme as, for example:

<img alt="..." src="https://github.com/OwainWilliams/MediaColourFinderV2/blob/develop/docs/screenshots/screenshot.png">
-->

## Installation

Add the package to an existing Umbraco website (v15+) from nuget:

`dotnet add package OC.MediaColourFinderV2`

## How to use

Once the package is installed, you will have a new property editor which should then be added to a Media Type of "Image".
When you upload an image, you can select a focal point (optional) and the package will then calculate the  average color, brightest color, opposite colour and text colour. If no focal point is set, the colours are calculated from the entire image.

<img src="../docs/images/colourfinderdemo.gif" alt="Media Colour Finder Demo" />

The calculated colours are then available as properties on the media item, which can be accessed in your views.
For example, if you call the new property on the media type "colour finder" it will have an alias `colourfinder` and can be accessed like :

```

@{
    var colours = (Model?.Image?.Content as Image)?.ColourFinder;
}

@if (colours != null)
{
    @colours.Average <span style="background-color: @colours.Average;">Average</span>
    <br />
    @colours.Brightest <span style="background-color: @colours.Brightest;">Brightest</span>
    <br />
    @colours.TextColour <span style="background-color: @colours.TextColour;">TextColour</span>
    <br />
    @colours.Opposite <span style="background-color: @(string.IsNullOrEmpty(colours.Opposite) ? "#fff" : colours.Opposite);">Opposite</span>
}



```

The output will be in HEX format, e.g. `#FFFFFF` which can then be used in your CSS.

## Contributing

Contributions to this package are most welcome! 
Please feel free to fork the repository and submit a pull request with your changes.

## Acknowledgments

Thanks to [Lee Kelleher](https://github.com/leekelleher/) for his help with the initial thought process and build of this new version. [#h5yr](https://h5yr.com)