![images look like this](/header2.gif)
_A practical course for those who want to use the computer to make nice maps._

- [Read me first](#read-me-first)
- [Step 0: Software](#step-0)
- [Step 1: Gathering map data](#step-1)
	- The basics of geospatial data
	- Data sources
	- Data processing
- Step 3: Map design
	- Rules for good maps
		- Always steal
		- Always grid
		- Always walk
		- Download the sample data package and how-to video library
	- Gestalt
	- Color
	- Type
		- Labels
		- Other type
	- The Territory
		- Terrain
		- Land cover
		- Contours
	- Lines
		- Casing roads
	- Fills
		- Faded interior fills
	- Points
		- Point-stroke knockouts
- [Resources](#resources)
- [Read me last](#read-me-last)

# Read me first <a id="read-me-first"></a>
The most beautiful maps are not behind us: they will be made today, by people who cared enough to make them. That sounds like you.

Speaking of you, are you:
- Comfortable fighting with the computer and typing into something called an "Integrated Development Environment?"
- Okay with dozens of trials ’til you get a good result?
- Any good at design or illustration?

If yes: you can read this guide and use mostly-free tools to make a very nice 4x4" map. The size of a coaster. If you can make a real nice small map, you can make a real nice map of any size.

Caveat: these are idiosyncratic notes on how I, Evan Applegate, n=1 computer-based cartographer, makes 51st percentile maps. I didn't learn cartography from a web site; I shared a desk with expert cartographer [Daniel Huffman](https://somethingaboutmaps.com) for ~18 months and asked hundreds of questions. So if you can swing it: apprentice yourself.

# Step 0: Software <a id="step-0"></a>
This is the only section that has both Windows and OSX instructions; I use OSX so everything after this will be for OSX only.

## QGIS

QGIS is a free, open-source program that lets you manipulate geospatial data and create PDF/SVG exports you can later cute up in design software. Visit https://qgis.org/download/ and follow the instructions for your operating system.

After installation add the following plugins via Plugins > Manage and Install Plugins > 
- Globe Builder
- GRASS GIS Processing Provider
- MetaSearch Catalog Client
- QuickMapServices
- QuickOSM
- Relief Visualization Toolbox
- Terrain Shading

## Design software
- Inkscape/Illustrator: I work in Adobe Illustrator, but Inkscape works if you'd prefer a free vector design software ([Alex McPhee](https://pronghornmaps.com/) swears by it): https://inkscape.org/
- GIMP/Photoshop: same idea for Adobe Photoshop, GIMP is free https://www.gimp.org/downloads/
- Some also use Affinity Designer, I never have, YMMV.

## Other software 
- Eduard: OSX only, great for making imitations of hand-drawn hillshades. You feed it your own elevation data or use the built-in downloader: https://eduard.earth/
- MAPublisher: an Illustrator plug-in that lets you directly import, manipulate and catalog geospatial data. If you make a lot of maps it is very useful (I use it all day) but I wouldn't pitch it for novices, it costs $3k: https://www.avenza.com/mapublisher/

## Command line software
If you're a pointy-clicky kind of computer user, this will seem unfamiliar but you'll come to appreciate the speed advantage over clicking. Also you'll mostly be using only three commands: ```cd``` to change folders, ```cd ..``` to move a level up in your file tree, and ```dir``` or ```ls``` to list all files in the current folder.

- GDAL: The "Geospatial Data Abstraction Library" manipulates raster and vector geospatial data; it undergirds QGIS's operations, and you can use it directly via terminal command.
	- Windows installation
		1. https://github.com/conda-forge/miniforge > look for "Download and execute the Windows installer." > you should have Miniforge3-Windows-x86_64.exe. Miniforge is a flavor of Anaconda, a Python package manager. It's easier to install GDAL using this thing.
		2. Open the EXE, install.
		3. Open "Miniforge Prompt" from the start menu.
		4. Now you'll create an "environment" in which you'll install gdal. So enter your environment name:
			```
			conda create --name my_geoprocessing_environment
			```

		5. Now you can activate your environment...
			```
			conda activate my_geoprocessing_environment
			```

		6.  ...and install GDAL :
			```
			conda install gdal
			```

		7. A bunch of text will scroll by, test to see if it installed:
			```
			gdalinfo --version
			```
			
			You should see something like "GDAL 3.10.0, released 2024/11/01"
	- Mac installation
		1. Download the Homebrew installer .pkg from the bottom of https://github.com/Homebrew/brew/releases/tag/4.4.17. Homebrew lets you easily install command line programs from a central repository.
		2. Open the .pkg, follow the installation instructions.
		3. Open a terminal window.
		4. Install miniforge, a flavor of the Anaconda Python package manager, using homebrew:
			```
			brew install --cask miniforge
			```

		5. Now you'll create a conda environment in which you'll install gdal:
			```
			conda create --name my_geoprocessing_environment
			```

		6. Now you can activate it...
			```
			conda activate my_geoprocessing_environment
			```

		7.  ...and install GDAL:
			```
			conda install gdal
			```

		8. A bunch of text should scroll by. Test to see if it installed:
			```
			gdalinfo --version
			```
			
			You should see something like "GDAL 3.10.0, released 2024/11/01"

## Language models and mapmaking
Cartography often requires processing gigabytes of vector and raster data, e.g. tiling several satellite images, getting time-series images out of a goofy file format, consolidating several hundred road files into one. Luckily in the far off year of 2025 you can ask a large language model (LLM) in plain english what you'd like, and OpenAI's ChatGPT or Anthropic's Claude will write code to process your data.

E.g. "read every .tif in this folder, extract bands 4, 3, 2 from each, write to a new .tif for each one" and it will write a python script, or "write a gdal command to reproject input.tif, in EPSG:4326, to EPSG:3339 while adding LZW compression and using the cubic resampling method" and you get a command to paste into your terminal.

__As of 1/2025 I use Codeium’s Windsurf https://codeium.com/, the Cascade feature + Claude 3.5 Sonnet allows the LLM to read/write files and run terminal commands. This saves you an enormous amount of copy/pasting. Ask Cascade to stick together 5 terabyte datasets, run through thousands of files, do anything your data-heart can imagine: you’ve hired an intermediate programmer with infinite patience for $20/mo.__

Windows terminal commands

|   Command    | Description                     | Example    |
|:-----------------|:------------------------------------|:---------------------|
| `cd`             | Change directory                    | `cd Downloads\my_geodata` |
| `cd ..`          | Change to the parent directory      | `cd ..` |
| `dir`            | List files in the current directory | `dir` |
| `del`            | Delete a file                       | `del test.txt` |
| `rmdir`          | Delete a directory                  | `rmdir /s test` |
| `mkdir`          | Create a directory                  | `mkdir test` |


Mac/Linux terminal commands

|   Command    | Description                     | Example    |
|:-----------------|:------------------------------------|:---------------------|
| `cd`             | Change directory                    | `cd Downloads/my_geodata` |
| `cd ..`          | Change to the parent directory      | `cd ..` |
| `ls`             | List files in the current directory | `ls` |
| `rm `            | Delete a file                       | `rm test.txt` |
| `rm -R`          | Delete a directory                  | `rm -R test` |
| `mkdir`          | Create a directory                  | `mkdir test` |


- 1. Map data
    - 1.x Projections 101 (very basics (since i dont know much beyond that)
    	- basic 3D > 2D geometry, sacrificing one: angles, distances, relative direction, size
    		- https://ihatecoordinatesystems.com/
    	- What you have to remember: you gotta get all your data into the same coordinate reference system (CRS). Rasters, vectors, all of it.
    - Scale
    	- What are you trying to show?
    	- Large-scale: zoomed-in, smaller denominator
    	- Small-scale: zoomed-out, larger denominator
	- 1.x Gather raster data, diff between vector and raster
		- 1.x.x Harvesting from ESRI stuff
			- ESRI's got a dozen nouns for "data pipe for vector and raster geodata," there's Feature Services, Feature Layers, Map Services, Tile Services, Image Services, Scene Services, Geoprocessing Services, Network Services, Web Map Services, Web Feature Services, Web Map Tile Service, Web Coverage Service, Hosted Layers, Stream Services, Locator Services, Data Stores. I have no idea what these nouns are, can't find a bestiary, you are on your own.
		- 1.x.x Elevation data: collected by lidar/radar, basic concept
			- USGS sources
			- OpenTopography
			- Viewfinder panoramas
			- Eduard
			- Undersea data
				- GEBCO
				- NOAA topobathy
		- 1.x.x Land cover data (link to sources, general method)
			- GLOBCOVER
			- NLCD
				can load this into QGIS as a WMS
			- that chinese dataset?
		- 1.x.x Satellite data: radiometers that can make images that look like they were collected by your DSLR CCD
			- Bands, indices
			- ESA sentinel explorer
			- USGS methods
			- QGIS method
	- 1.3 Gather vector data
		- 1.x.x Toponymy (GNIS, gazzetteer, etc)
			Easiest way to get stuff for the US: https://edits.nationalmap.gov/apps/gaz-domestic/public/search/names , tick visible in current extent, query, click download>arrow

			theres an API but i dunno how to use it

			mapping outside the US but want to know what shits called?
			can spatial-query + export with https://geonames.nga.mil/geonames/GeographicNamesSearch/ , desig_cd is the type of feature, lookup table is 

			layer > add layer > add delimited text layer > ... enxt to filename, pick your CSV > under geometry definitions, select point coordinates >leave geometry CRS at 4326

			too many? research tools > select by location > first box is the GNIS point layer youre gonna cut donw, second box is the bounding box you made in the beginning > run, it'll select all the points > right click the GNIS point layer > export > save features as > tick save only selected features > change CRS to EPsG:26943 > format: ESRI shapefile (this doesnt really matter, geojson is just kinda slow for me)

			it'll give you all these categories, you dont need all of these on one map generally; making a physical geog map? keep the channels, points, bays, islands etc, ditch civil, military, etc

			census you can safely ditch

			Area
			Bar
			Basin
			Bay
			Beach
			Canal
			Cape
			Census
			Channel
			Civil
			Cliff
			Crossing
			Falls
			Flat
			Gap
			Gut
			Island
			Lake
			Military
			Pillar
			Populated Place
			Range
			Reservoir
			Ridge
			Sea
			Spring
			Stream
			Summit
			Swamp
			Valley
			Woods

			vector > data management tools > split vector layer > input layer is your GNIS points layer > uniqe ID field pick  "class" > output file type geojson > output directory, pick a folder to store them > run, bunch of layers appear

			pick one of your new layers > symbology > size down the points to 0.25
			labels > single labels > value set to feature name 
			rendering > text, 2 point type (this makes them easier to thin out in AI) > rendering > overlapping labels > allow overlaps without penalty
			

			styles > copy style > all style categories



			no composition in qgis, you do all that in AI
			new print layout > icon with + and a roll of paper, drag rect to canvas to add > item properties to change scale, final size > save as SVG > export layers as SVG groups > export text as text objects 

			open in AI, you gotta get the point markers in the same layer as the labels (they're separate in the SVG)

			in the AI you can replace the placeholder raw relief with your land cover + relief, i exported a PNG

			- Undersea toponymy
				https://www.charts.noaa.gov/InteractiveCatalog/nrnc.shtml for US undersea stuff
				https://www.ngdc.noaa.gov/gazetteer/ Undersea Features Gazzetter

				https://www.ngdc.noaa.gov/mgg/bathymetry/maps/directdownload.html for older NOAA undersea charts, useful for labeling

		- 1.x.x Hydro (NHD, natural earth, census, FWS, OSM)
		https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html

		water > linear hydrography > pick state > pick counties > add SHPs to QGIS

		across two counties: download both, drag SHPs into QGIS > vector > data mgmt tools > merge vector layes > pick both > have the new layer in layers patlette

		vector > geoprocessing tools > clip > pick your all_area_water layer in first dropdown, your original extent polygon in the second > run

		right slick > export > save features as... > pick name, geojson, make sure the projection is same as the project EPSG:26943

		now you have all linear hydrography (creeks, rivers) on one layer clipped to your map extent

		repeat same steps for area hydrography (lakes, ponds)

		merge all rivers, lakes of same same: vector > geoprocessing tools > dissolve > pick input layer what you want to work on > dissolve field is FULLNAME, 322 features to 89.

		repeat same for area hydrography

		coastline: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html

		download national file
		drag SHP into QGIS
		vector > geoprocessing tools > clip > pick your all_area_water layer in first dropdown, your original extent polygon in the second > run

		vector > geoprocessing tools > dissolve > pick input layer what you want to work on > dont pick dissolve fields, this merged everything into one line


		- 1.x.x Political bounds (natural earth)
		- 1.x.x Roads, rails (OSM, census)
		Roads: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html
		web interface

		download all roads > pick state > pick county

		across two counties: download both, drag SHPs into QGIS > vector > data mgmt tools > merge vector layes > pick both > have the new layer in layers patlette

		vector > geoprocessing tools > clip > pick your all_roads layer in first dropdown, your original extent polygon in the second > run

		right click > save as geojson > right click > open attribute table > see RTTYP? here's the lookup

		C	County
		I	Interstate
		M	Common Name
		O	Other
		S	State recognized
		U	U.S.

		I, S, U are the larger roads, usually
		C is two-lane highways
		M, and Null (no RTTYP) are smaller

		vector > data management > split vector layer > unique ID field RTTYP > output file type geojson > pick an output directory > run 

		now you have all roads on discrete layers

		- 1.3.4 Airport points, polys (OSM)
		- 1.3.5 Neighborhoods (gazzetteer? airbnb zillow?)
		- 1.3.6 Nature (OSM, parks, etc)
		- 1.3.7 Admin divs (US only)
	- 1.4 Processing your data
		- 1.4.1 Remember to reproject!
			- Raster in QGIS, GDAL
			- Vector in QGIS, GDAL
		- 1.4.2 Filtering
		Make a jig: QGIS create layer > new shapefile layer > pick a folder, name > geometry type point > it appears in the layer panel, > edit button > add point feature > click center of what you wanna map > click edit button agian to save > processing toolbox " rectangles, ovals, diamonds" > input layer = the shp you just made > shape "rectangle" > pick height, i did 50x50 mi TK > segments 4 > run > appears on layers panel > right click export > save features as... > pick a file name>  make sure CRS matches bottom right of your QGIS window, the project CRS
		right click > layer properties > information > Information from provider > Extent > copy those four values, chop off last digits

		1846577.07,502154.17 : 1904513.46,560090.55

		rearrange to ???

		head to https://coast.noaa.gov/dataviewer/#/lidar/search/-13618597.819984838,4374679.235509932,-13544447.333741099,4451287.649944467 to get an MTY topobathy DEM

		pick  NOAA NCEI Continuously Updated Digital Elevation Model (CUDEM) - Ninth Arc-Second Resolution Bathymetric-Topographic Tiles https://noaa-nos-coastal-lidar-pds.s3.amazonaws.com/dem/NCEI_ninth_Topobathy_2014_8483/index.html

		download tile index Tile Index: tileindex_NCEI_ninth_Topobathy_2014.zip

		open > shp into QGIS window > select features by area (make sure the new layer is selected on the left) > drag box around the tiles tht overlap your square > right click on tiles layer > open attribute table > bottom left  "show selected features"

		right click tile index layer > export features > pick CSV > tick "save only selected featueres" > open CSV > copy list of URLS > paste in a plain text file > download each one by one or wget -i your_file_list.txt

		drag all .TIFs into their own dir 

		`gdalbuildvrt DEM_huge.vrt *.tif` 

		drag this into window > dlb clickl to open layer properties > see pixel size = 3, -3, so its 3m pixels, ~10ft res topobathy DEM. thats a little big for the map we're making

		resize, resample, crop and reproject that big DEM:

		`gdalwarp -co "COMPRESS=LZW" -tr 10 10 -r cubic -t_srs EPSG:26943 -cutline 36_mile_square.shp -crop_to_cutline out.vrt cropped_10m.tif
`

		drag this into window > dlb clickl to open layer properties > see pixel size = 3, -3, so its 3m pixels, ~10ft res topobathy DEM. thats a little big for the map we're making

		if oyu're dumping these into EDUARD you can use whatever size you want since you can interactively generalize

		processing > terrain shading to make your outputs, test a bunch with
		ambient occlusion
		hillshade
		shadow depth
		texture shading

		when its time to go to photoshop we gotta take these from 32 bit to 8 bit to make them easier to manp in PS; theyre not RAWS you dont need all the range

		 right click > export > save as > tick "rendered image"


		Or use bbox.io?
			- Raster
				- Cropping
				- Bit depth and re-scaling DNs
				- Relief design
					- Eduard
					- QGIS
						- Terrain Shading Plugin
							- Hillshade
							- TPI
							- Texture shade
							- Shadow depth
					- GDAL
						- Different flags
					- Blender
						- Link out, I hate this thing
			- Vector
				- Spatial queries
				- Attribute-table queries
				- Contours
				check DEM units
				-i is the interval; so -i 20 on a meter-unit DEM means your contours will have 20m intervals
				```gdal_contour -a ELEV -i 40 -f "ESRI Shapefile" in1.tif "out_1"```
				I recommend using this script by Henrik https://hkartor.se/anteckningar/contour_lines_script.html
				I modded it to change the -ot to Float32 so I can use it for underwater bathy
				if you want contour polygons stedda lines use `-p -amin "min_elev" -amax "max_elev"` stedda `-a ELEV`
				to label contours
				https://opensourceoptions.com/how-to-create-contour-lines-and-labels-with-qgis/
				only thing id add: placement > general settings > mode: curved
				note: this breaks up your text paths. QGIS SVG export doesnt understand type on a path


You’ll encounter dozens of arcane file types but here are the main ones to look out for. All of these get worked over in QGIS and GDAL.

.SHP – Shapefile – stores vector shapes + associated data. Imagine you drew a hexagon and saved it as a vector file, but didn’t stop there: you also attached a table to that shape listing the hexagon’s name, when you drew it, its size in square meters, etc.
.GEOJSON – GeoJSON – also stores vector shapes + data tables.
.TIFF – GeoTIFF –stores raster data like satellite images, terrain data. Like a regular TIFF except it comes with georeferencing that tells QGIS where on earth to place it.
.GDB –GeoDatabase – Stores vector shapes + data too.
Where to get geographic data

Countries, Lakes, Rivers – Natural Earth supplies geographic boundaries and features; for a quick overview download the quick start kit, open the .QGS file in QGIS and see how it looks. Not great? Well, thats where you come in.

Roads – Natural Earth has roads, but not all of them. If you want to make a road map of your city, use OpenStreetMap data downloaded via the BBBike.org site. You zoom to where you want some data, draw a box, give it your email and it’ll send you a shapefile that you can view in QGIS.

Land cover (is that part of earth a forest? A town? A desert?) – Want to show what’s down there? If your map shows a big chunk of the world, 300-meter resolution Globcover 2009 data should work; find “A coloured version of the map in GeoTIFF format” on that page to get a file you can tune up in QGIS and Photoshop. For North America the Commission for Environmental Cooperation has a detailed 30-meter resolution dataset.

Terrain – the hills and valleys, a.k.a “shaded relief” or “hillshade.” This used to be drawn with graphite and airbrushes, now you turn satellite altimetry data into little computer-generated landscapes. You can get pre-generated terrain from Natural Earth: for zoomed-in maps, for zoomed-out maps, for just the U.S..

You can also roll your own terrain by grabbing elevation data for your map area from the Open Terrain Project and making your own (see step ❸).

Bathymetry (underwater terrain) – If your map includes undersea terrain, use the GMRT map tool to download data. Pick the rectangle tool at the top > drag a rectangle for your area > “create grid file”, file format: geotiff, mask: unmasked, grid resolution: maximum > download grid. You can process this into contours or a hillshade in step ❸.
Need something else? Time to start sifting the resources page down there ▼.

❸ Design your map

So now you have QGIS and GDAL installed, plus a folder full of geographic data. How do you turn that into a map? Someday you’ll get an end-to-end account (it’d take like 30,000 words and good screencasts) but for now you join the grand tradition of “follow a tutorial (check the resources pile at the bottom of this page ▼), ask your computer pals at The Spatial Community for help when you get stuck.”

Reproject your data

Whatever coordinate system you project your data into, you gotta apply that same projection to all the other data in your map. It’s all gotta match!

Vector data is easy to reproject in QGIS. Raster stuff like imagery and elevation data is a bit more involved:

You can get into the weeds on picking a map projection, since you’re on the leaves of the old math problem of how to represent 3D stuff on a 2D plane. Luckily nobody’s navigating by your map, so just pick a projection that looks nice. Draw out a box enclosing your area of interest on projectionwizard.org and see if any of those look good. Or just default to Universal Transverse Mercator (UTM), nobody complains about that one.
Get a projection you like? Copy the PROJ string from projection wizard or look up your UTM zone’s EPSG code on EPSG.io 
Feed that string or EPSG code into GDAL to change the projection of your data. You can also change projections in QGIS. 
Make the terrain

My favorite part of maps is the topography. Make your own in QGIS or...
Try it in GDAL. The command line is a bit painful to learn at first but it will be much faster; making nice terrain requires a lot of experimentation, so you’ll need that speed.
If you want very nice terrain, make it in a 3D-modeling program (Blender). It’s free and not that hard if you follow the instructions carefully. 
Eduard turns your DEMs into a looks-like-an-Imhof-graphite-relief (ML......wow)
PLEASE draw your own terrain: Sarah Bell wrote two tutorials on how to render shaded reliefs in pencil.
Design time

Once your data’s cleaned up and you’re left with what you want to show on your map, you export an SVG/PDF out of QGIS and make your vectors look nice in Illustrator or Inkscape. For the rasters (e.g. terrain and satellite imagery) export a TIFF from QGIS/GDAL and edit them in Photoshop or GIMP. There are tools that make this more convenient, like the wildly expensive MAPublisher plugin for Illustrator, but they’re not necessary.

Find some maps you like and see how close you can get; I think of ’tography as more craft than art, so you can get real far by copying the masters. Raid the inspo column down there ▼.

Now you’re in the art zone: compositing in Illustrator, labeling, futzing with colors, upsetting back-tracks to your original geodata, adding cute ephemera like north arrows and legends, illustrations. Make it look nice. Real nice. I can’t wait to see your map ♡.


- 2. Map Design
	- Naked theft: NPS etc
		- Choose a state, choose a park, get an Illustrator version of that map: https://www.nps.gov/carto/app/#!/parks
		- Metadata: https://www.nps.gov/carto/app/#!/maps/production-tips
		- .AIT templates towards the top, broken links but if you paste them into the archive.org waybackmachine they download fine: https://www.nps.gov/carto/app/#!/maps/starter-maps , e.g. https://web.archive.org/web/20170605123357/https://www.nps.gov/hfc/carto/starter-maps/a_starter.zip


- 2.1 Setup
		- Layers
		- Do as much as possible in QGIS to reduce one-way trips
			- create extent line that's always on your exports
		- Gestalt first!
			- lookit stuff liek this first
- X.1 Vector
		- X.1 Color
			- Steal from better maps
		- X.1 Type
		Arranging type is the most labor-intensive part of cartography. A good map has no collisions, no ambiguous placement, not one careless label. It's the brown M&M test of mapmaking: if the maker didn't look over every square inch, it'll show in the labels.
			- Examples
			Mike Hall, Daniel Huffman, Michelle Snyder, Marty Schnure, Jeff Clark, Dave Imus, Carl Churchill, Alex McPhee 
			- Halos
			Labeling tip from Andy Woodruff: instead of using outer glow/drop shadow/blurred strokes to set labels off from the background, use a blurred version of your raster underlayer that shines through 0% opacity strokes to a blurred version of your raster.
			1) "Burn" your rivers, roads into your raster, You can do this in Illustrator by exporting a no-labels PNG of the whole map, artboard = full extent.
			2) Create a blurred version of this raster: I like turning it into a Photoshop smart object before gaussian-blurring so I can adjust it later. 
			3) Layer order top-to-bottom: all map stuff (including your raster underlayer) in one supra-layer > blurred raster
			4) Check knockout group on your supra-layer
			5) For your label layer: add a 0% opacity blurred stroke, drag it under "contents" to ensure your original type colors are preserved
			6) Enjoy your sweet movable type halos
			- Knockouts
				https://somethingaboutmaps.wordpress.com/2021/05/19/blurring-backgrounds-to-improve-text-legibility/
				https://somethingaboutmaps.wordpress.com/2015/05/08/type-knockouts-in-illustrator/
				https://somethingaboutmaps.wordpress.com/2016/12/05/even-fancier-type-knockouts-in-illustrator/
				https://somethingaboutmaps.wordpress.com/2018/10/28/smart-type-halos-in-photoshop-and-illustrator/
			- How to label...
				- Rivers, Ranges, Areas
					type on a path is annoying but no way to improve at this without getting your reps in. Use direct select tool (A, looks like a white arrow) to drag the handles from either end, if your text flips upside down drag ⟘ perpendicular to your line, if you can't see anything but a red + you gotta drag the handles from either end. Add points to the line with pen tool add anchor point, drag out sides, then use direct select to select new anchor point, drag bezier handles to get the text lookin right.
					You gotta track this out; a long mountain range or river gets type that looks like t    h    i     s  and a short one gets text that looks like this. 
				- Points
					top right?
				- Road shields
					steal from noun project
				- Soundings
					itals
				- Contours
					dunno how to do this automated
		- X.1 Icons
			- Symbol palette
			Use Nate Kelso's replace-with-symbol to get QGIS's lil point symbols into symbols; create symbol you like, select it + the points you want to turn into that symbol, run this 
			https://kelsocartography.com/scripts/scripts/nvkelso/findAndReplaceGraphic_centered_v2.jsx
		- X.1 Lines
			- Casing roads
			- Dotted, dashed lines
		- X.1 Polygons/shapes/fills
			- Glows
			Polygons with interior faded glows: black fill, feather effect, opacity 0% above ANOTHER fill with the color you like. might need knockout group enabled too
			- Coast lines (adjustment panel)
			Making vintage-style coast lines in Illustrator: to your coastline path add a series of strokes in the appearance panel, each gets an offset path effect. Increase the offset path distance between each stroke so they spread out as they get further from the coast.
			This is a last step as it makes Illustrator very slow; I save the appearance as a graphic style and apply it when I'm ready to export.
			- Generalization
				Cut down voids/gaps in your parks layers manually, makes a cleaner output. mapshaper.org is good for this too if you jstu want fewer vertices
		- Metadata
			in QGIS print composer on the left is "add scale bar," drag a box and it'll appear, i change it to miles and add some segments. you'll use this as a template to draw over in illustrator
- X.1 Raster
		- Blend modes, opacity
		- Adjustment layers
		- Land cover
		NLCD WMTS layer > cropped TIF > PS > re-paste into discrete classes > change colors, add patterns from my old LC.psb > steal colors from henrik, churchill, old USGS > use end-at-land topobathy DEM to mask land and add topobathy gradient
		NLCD to vector:
		If you want e.g. wetlands, use the QGIS raster calculator to get classes 91 and 92, "woody wetlands" and "emergent herbaceous wetlands," into their own TIFF. raster calc > ("NLCD land cover@1" = 91) OR ("NLCD land cover@2" = 92)
		Use QGIS polygonize to turn those classes into polygons
		Delete polygons where DN = 0, those are the ones we dont want
		Exported to SVG
		Place polygons in Illustrator, offset path to expand them, make everything into a compound path, use that compound path as a mask over a pattern of marsh symbols. I never have any luck at making repeating patterns so I just copy/pasted a bunch of little marsh marks.
		Can also use the built-in pattern swatches; Swatches > Open Swatch Library> Patterns > Basic Graphics > Basic Graphics_Textures, I like "USGS 17 Dry Sandy Lake." otehrs are nice too.
	- Color schemes
	- Ice
	- Patterns
- Elevation
	- Relief layer order
	- The futz...
	- Imagery drape

# Resources <a id="resources"></a>

[Join The Spatial Community Slack and get answers to your geo-questions. Sign up > enter email address > join slack, #newcomer-questions will sort you out](https://thespatialcommunity.org/)

|   Cartographers & map companies    |     |
|:--------------------------|:----|
| [Eleanor Lutz](https://eleanorlutz.com/animated-seasons-of-arctic-ice) | [Sarah Bell](https://www.sarahbellmaps.com/drawing-color-hillshade-a-tutorial-with-time-lapse-videos/) |
| [Charles Preppernau](https://geolographer.xyz/) | [Leonie Schlosser](http://leoniecartographie.com/category/cartes-geographiques/) |
| [Agnes Denes](http://agnesdenesstudio.com/works18.html) | [Nat Slaughter](https://www.centralparksquirrelcensus.com/) |
| [Aaron Taveras](https://www.cartografix.co/) | [Loraine Rutt](https://thelittleglobeco.com/thejourney) |
| [Alex McPhee](https://pronghornmaps.com) | [Agnès Stienne](https://visionscarto.net/le-grand-marche-aux-terres) |
| [Bill Marsh](https://web.archive.org/web/20150112164033/http%3A//marshmaps.com/exploremap.html) | [Margot Dale Carpenter](http://www.hartdalemaps.com/) |
| [Riley D. Champine](https://www.rileydchampine.com/) | [Eric Knight](https://www.ericknightmaps.com/panoramas) |
| [Jack Henderson & Pete Kennedy](https://www.pisgahmapcompany.com/shop-trail-guides/shiningrock) | [Anton Thomas](https://www.antonthomasart.com/) |
| [Neil Gower](http://www.neilgower.com) | [Sophie Parr](https://instagram.com/mapsbysophie) |
| [Anna Eshelman](https://www.annaeshelman.com/) | [Lauren Tierney](https://laurenctierney.com/) |
| [Tom Patterson](http://www.shadedrelief.com/) | [Marty Schnure](https://martyschnure.cargo.site/cartography) |
| [Jane Crosen](https://www.mainemapmaker.com/posters.html) | [Michelle Snyder](https://www.quaillanepress.com/) |
| [Margaret Pearce](https://www.studio1to1.net/about) | [Henrik Johansson](https://hkartor.se/) |
| [Mike Hall](https://www.thisismikehall.com/) | [Carl Churchill](http://www.churchillgeo.com/) |
| [Daniel Huffman](https://somethingaboutmaps.com) | [Bellerby & Co.](https://bellerbyandco.com/) |

|   Map collections    |     |
|:--------------------------|:--------------------------|
| [Historical NOAA nautical charts](https://historicalcharts.noaa.gov/) | [U.S. National Archives](https://catalog.archives.gov/advancedsearch) |
| [American Geographical Society collection](https://collections.lib.uwm.edu/digital/collection/agdm/search/searchterm/new%20york/page/29) | [National Library of Scotland](https://maps.nls.uk/geo/explore/#zoom=9&lat=57.49584&lon=-4.94487&layers=3&b=1) |
| [British Library](https://www.flickr.com/photos/britishlibrary/albums/72157716220271206/page10) | [Boston Library](https://collections.leventhalmap.org/search/commonwealth%3Acj82km61z) |
| [David Rumsey Map Collection](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~211864~5004539) | [USGS historical topographic maps](https://ngmdb.usgs.gov/topoview/) |
| [Public domain shaded reliefs](http://www.shadedreliefarchive.com/) | [New York Public Library map collection](https://digitalcollections.nypl.org/divisions/lionel-pincus-and-princess-firyal-map-division) |
| [Osher Map Library](https://oshermaps.org/browse-maps) | [Perry-Castañeda Library Map Collection](https://maps.lib.utexas.edu/maps/index.html) |
| [Library of Congress (change search dropdown to maps)](https://loc.gov/) | |

|   Tutorials    |     |
|:--------------------------|:--------------------------|
| [What the hell is a coordinate system anyway?](https://ihatecoordinatesystems.com/) | [Daniel Huffman’s cartography tutorials.](https://somethingaboutmaps.wordpress.com/tutorials/) |
| [Carl Churchill’s shaded relief tutorials](http://www.churchillgeo.com/blog/) | [D3 cartography](https://medium.com/%40mbostock/command-line-cartography-part-1-897aa8f8ca2c) |
| [Command line cartography with mapshaper](https://moriartynaps.org/command-carto-part-one/) | [QGIS tutorial 1](https://www.youtube.com/watch?v=aLmMovuydqI) |
| [QGIS tutorial 2](https://www.youtube.com/watch?v=lg9ceXoCUFE&list=PL7HotvlLKHCs9nD1fFUjSOsZrsnctyV2R) | [Intro to QGIS](https://spatialthoughts.com/courses/introduction-to-qgis/) |
| [Intro to satellite data + GDAL](https://medium.com/%40robsimmon/making-sense-of-satellite-data-an-open-source-workflow-accessing-data-8f7f3c30f151) | [Common satellite data + GDAL operations](https://github.com/timwallace/nicar20-imagery-with-bash) |
| [Google Earth Engine end-to-end tutorial](https://courses.spatialthoughts.com/end-to-end-gee.html) | [Generate a DEM from LIDAR](https://dominoc925.blogspot.com/2017/07/use-pdal-to-generate-dem-from-lidar-las.html) |
| [Rob Simmons’ GDAL tutorials](https://medium.com/planet-stories/a-gentle-introduction-to-gdal-part-1-a3253eb96082) | [Map School](https://mapschool.io/) |
| [Change projections in QGIS](https://www.youtube.com/watch?v=6HkMxDijgbs) | |

|   Map design    |     |
|:--------------------------|:--------------------------|
| [Pick a National Park Service map > get to the park map page > "Adobe print production ZIP file"](https://www.nps.gov/media/photo/collection-item.htm?pg=7347320&cid=305fb7af-a71b-469b-941e-a98b439c882f&id=c51f64fd-51dc-400e-b562-d02789c95933&sid=1e843023-c4e1-4edb-96be-6444f5fc3468&p=1&sort=) | [Color palette generator](http://vrl.cs.brown.edu/color) |
| [I Want Hue, another palette generator](https://medialab.github.io/iwanthue/) | |

|   Vector data: boundaries, points of interest   |     |
|:--------------------------|:--------------------------|
| [Natural Earth: 1:10m to make zoomed-in maps, 1:110m to make zoomed-out maps](https://www.naturalearthdata.com/downloads/) | [Natural Earth quick start kit](https://naciscdn.org/naturalearth/packages/Natural_Earth_quick_start.zip) |
| [Extract OpenStreetMap (OSM) data by bounding box](https://extract.bbbike.org/) | [U.S. Census geodata](https://censusreporter.org/) |
| [Download Overture Maps Foundation data by bounding box (I wrote this using GPT4)](https://overturegrabber.evanapplegate.com) | [Global city boundaries](http://quattroshapes.com/) |
| [Download OSM data by city](https://www.interline.io/osm/extracts/) | [Download OSM data by country](https://download.geofabrik.de/) |

|   Raster data: satellite imagery    |     |
|:--------------------------|:--------------------------|
| [Remote sensing basics](https://ecologicalprocesses.springeropen.com/articles/10.1186/s13717-020-00255-4) | [Sentinel-2, Sentinel-1, Landsat browser: Sentinel Hub](https://apps.sentinel-hub.com/eo-browser/) |
| [MODIS/VIIRS browser](http://ge.ssec.wisc.edu/modis-today/) | [NASA Worldview: browse Landsat, Sentinel, GOES](https://worldview.earthdata.nasa.gov/) |
| [GOES-16 browser](https://zoom.earth/#view=41.078,-126.31,7z/date=2020-09-10,11:30,-4/layers=live,fires) | [Sentinel-1 browser](https://kristofvantricht.users.earthengine.app/view/sarworld) |
| [Download by lat/long from all of NOAA's sensors](https://coastwatch.pfeg.noaa.gov/erddap/griddap/index.html?page=1&itemsPerPage=1000) | [High-resolution imagery browser (expensive)](https://discover.digitalglobe.com/) |
| [Tim Wallace's satellite imagery resources](https://github.com/timwallace/nicar20-imagery-sources) | [How to find the most recent imagery](https://www.azavea.com/blog/2020/01/02/how-to-find-the-most-recent-satellite-imagery/) |
| [Charlie Loyd's imagery compendium](https://planet.parts/) | [Google Earth Engine has all sat data, you can do anything to billions pixels on someone else's computer](https://code.earthengine.google.com/register) |

|   Raster data: land cover    |     |
|:--------------------------|:--------------------------|
| [30m North American land cover](http://www.cec.org/north-american-environmental-atlas/land-cover-30m-2015-landsat-and-rapideye/) | [30m U.S. land cover (NLCD)](https://www.mrlc.gov/viewer/) |
| [30m U.S. croplands](https://nassgeodata.gmu.edu/CropScape/) |  [100m CONUS shaded relief + land cover](http://shadedrelief.com/NE_100m/#download) |
| [30m global land cover](http://data.ess.tsinghua.edu.cn/) | [100m global land cover](https://lcviewer.vito.be/download) |
| [300m global land cover](http://maps.elie.ucl.ac.be/CCI/viewer/download.php) | |

|   Raster data: elevation    |     |
|:--------------------------|:--------------------------|
| [30-90m elevation data](https://medium.com/wegaw/free-geospatial-data-sources-an-attempt-to-tame-the-beast-part-1-1608ed4c8800) | [Elevation data finder: openterrain](https://github.com/openterrain/openterrain/wiki/Terrain-Data) |
| [Elevation data finder: opendem](https://opendem.info/opendemsearcher.html) | [Elevation data finder: opentopography](https://portal.opentopography.org/datasets) |
| [Elevation data finder: imagico](http://www.imagico.de/map/demsearch.php) | [Bathymetry finder](https://www.gmrt.org/GMRTMapTool/) |
| [Antarctic bathymetry](https://www.scar.org/science/ibcso/ibcso/) | [Viewfinder Panorama filtered DEMs](https://www.viewfinderpanoramas.org/dem3.html)|

|   Software, tools   |     |
|:--------------------------|:--------------------------|
| [QGIS: open source GIS software for Windows, OSX, Linux](https://www.qgis.org/en/site/forusers/download.html) | [GDAL/OGR: open source command-line GIS tools](https://medium.com/%40egiron/how-to-install-gdal-and-qgis-on-macos-catalina-ca690dca4f91) |
| [You into command line stuff, Python, R, C++? Here's every geodata processing tool](https://github.com/sacridini/Awesome-Geospatial) | [Eduard: machine learning shaded relief](https://eduard.earth/) |
| [Inkscape](https://inkscape.org/) | [GIMP](https://www.gimp.org/downloads/) |
| [MAPublisher](https://www.avenza.com/mapublisher/) | [Excel geocoder, just need a free Bing API key](http://excelgeocodingtool.com/) |
| [Projection Wizard (helps you pick a projection for your map's area)](https://projectionwizard.org/) | [Mapshapher: drop in unprojected/WGS84/EPSG:4326 vector data, it will strip out 99% of the points you don't need](https://mapshaper.org) |
| [GDAL/OGR cheat sheet](https://github.com/dwtkns/gdal-cheat-sheet) | |

|   Resource pages    |     |
|:--------------------------|:--------------------------|
| [By Maptime](http://maptime.io/lessons-resources/) | [By Robin Tolochko](https://github.com/tolomaps/resources#general-mapping-stuff) |
| [Harry Kuril’s list of cartography sites](https://docs.google.com/spreadsheets/d/1kKIZxGNNjY4K_07fKHmxunzoruju6gODeWaD5IUe9Wc/edit?gid=1825267729#gid=1825267729) | [By RT Wilson](https://freegisdata.rtwilson.com/#home) |

|   Misc.   |     |
|:--------------------------|:--------------------------|
| [Square cartogram maker one](http://code.minnpost.com/aranger/) | [Square cartogram maker two](http://wsj.github.io/squaire/) |
| [Hex cartogram maker](https://pitchinteractiveinc.github.io/tilegrams/) | [Sankey diagram maker](http://sankeymatic.com/build/) |
| [Map icons](https://github.com/tangrams/icons) | [Custom embedded Google Map and markers](https://snazzymaps.com/build-a-map) |
| [Export Mapbox basemaps to JPEG](https://printmaps.mpetroff.net/) | [In-browser land cover classifier](https://remap-app.org/remap) |
| [Download OpenStreetMap raster tiles](http://bigmap.osmz.ru/index.html) | [Change DMS coordinates to decimal degrees](https://gis.stackexchange.com/questions/79207/coordinates-values-change-for-arcgis/79218) |

# Read me last <a id="read-me-last"></a>

The most beautiful maps are not behind us: they will be made today, by people who cared enough to make them. That sounds like you.

Luckily great cartography requires no formal training or credentials. I learned by trial and so will you.

The best contemporary mapmakers taught themselves: [Eleanor Lutz](https://eleanorlutz.com/animated-seasons-of-arctic-ice) is a bio PhD and learned cartography on her own. Illustrator [Mike Hall](https://www.thisismikehall.com/) sketched maps in his notebook during shifts as a security guard, and now has an agent to handle his map deals. [Alex McPhee](https://pronghornmaps.com/) studied geophysics, decided he needed to map his native Alberta, got some open source geo-software and made a few of the best modern reference maps.

Mapmaking is like cooking: you pick what you like to eat, and improve by trial. You’ll over-salt a few dishes, ruin a few pans and come out a master. You just have to pick some Territory to commemorate.

You can make a map with charcoals and an easel, a stick and some sand, a pencil and graph paper, a grid computing cluster, some hideously expensive software, some there’s-no-way-this-is-free software, a drone with a camera, a satellite with a radiometer, all ways to the same end. There’s no “correct” way to make a high-effort map.

Every cartographer has their own idiosyncratic way of making maps; this is only what I can get my head around. If this doesn’t work for you please check out other other tutorials in the [resources](#resources) section, they might click better.

My toolkit:
- QGIS
- MAPublisher
- Mapbox Studio
- Photoshop
- Illustrator
- InDesign
- Windsurf Cascade talks to Claude 3.5 Sonnet, which handles scripts that use:
	- GDAL
	- Python
	- Imagemagick

My map workflow, you’ll find yours soon enough:
1. Download geographic data: roads, rivers, lakes, hills, valleys, towns, lighthouses, etc.
2. Thin out, clean, futz with that data in QGIS, GDAL (I ask Claude 3.5 to write the commands and scripts). Modern start-with-pile-of-data carto is about knowing what to leave off the map, so you’ll spend a lot of time sifting tangles of data for what you actually want to show.
3. Make the remaining data look nice in Illustrator and Photoshop.
4. Embellish: hire illustrators, letterers, other artists.  Art direction tip: don't ask an artist to work outside their wheelhouse. Also I don't revise something to death, if the work-for-hire is not what I envisioned, I say "Thanks!", pay the last half and find someone else.

_Why I wrote this_
I want to see another [Turgot map](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~287244~90059510:Composite--Paris--Plan-de-Turgot) before I die. I want my grandkids to cherish a map made in the 2030s. I want my favorite material culture to live on.

_The problem_ 
The worst map of 1890 looks better than 99% of today’s maps. In 1910 you could buy a 50-cent rail route pamphlet that looks better than any map you can buy today. This sucks, but it could not be otherwise; consider who makes today’s maps:

- Atlas cartographers: mostly gone, those who remain can’t pick colors.
- GIS managers: their job is to manage the sewer pipe/streetlamp database and make maps for 8.5x11"  PDFs, can’t design or don’t have time.
- Editorial/news cartographers: under tight deadlines, editors don’t care, art directors don’t discourage nice maps but they also don’t know how to shape or commission them.
- Government cartographers: almost all GIS managers, the maps just gotta reflect the database, nobody cares how they look.
- Nonprofit cartographers: too busy with GIS tasks, boss doesn’t care about nice maps.
- Big tech cartographers: Google/Apple’s maps are database outputs, too constrained by people poking at the map to make them look nice.
- Academic/critical cartographers: not rewarded for making nice maps, rewarded for writing recondite PDFs _about_ maps.
- Capital A Artists: too into deconstruction to make a sincere attempt.
- Biz intelligence cartographers: who’s gonna cherish a bunch of hex bins?

The only good cartographers are illustrators. In an illustrator's map, gestalt and composition come first. Crucially, they don’t just affirm software’s idea of how a map should look.

_The Solution_
Every beautiful high-production map you'd see in a repository can be made today, maybe better. They had "time, strength, cash, patience," but while attenuated, those things are still around; some patron could pay an illustrator to walk around a city for years and draw every building he saw, like the [Prévôt des Marchands of Paris did in 1734](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~287244~90059510:Composite--Paris--Plan-de-Turgot).

The bad news is there is no living memory of this stuff, no old hands to teach how rich maps were constructed. We start from scratch. The good news: we know exactly what to aim for. A time and money problem sounds tractable to me.

There’s no building you can walk into where someone will grab you by both ears and teach you how to make a beautiful map. Formal cartography education does not exist in the US; I have a (free) M.S. in cartography and most of the looks-nice mapmaking I did was extracurricular.

Today’s talented anglophone mapmakers, and there are many, taught themselves. They are the only ones taking this seriously; the autodidacts are my favorite. I just wish you didn’t have to be a five-star autodidact to make nice maps.

If I really had my druthers I'd solve this with ~$15 million, property, and professional instruction: make more mapmakers by apprenticeship. I learned mapmaking by close-range apprenticeship; so, a school with a 1:1 instructor ratio. If you've got the building, I have the staff. Call me.

![images look like this](/best_maps_still_to_come.gif)