# Sixteen Square Inches of Map: a Cartography Course by Evan Applegate
_A practical course by Evan Applegate for those who want to use the computer to make nice maps. If you need help, reach out at TK._

![images look like this](path/in.gif)

- [Read me first](#read-me-first)
- Step 0: Install software
    - Install QGIS
	- Install GDAL
    - Design software
    - Eduard
	- Avenza MAPublisher
	- The computer talks to the computer: LLMs and you
		- Command-line stuff, why its good and fast
- Step 1: Gather map data
	- Data sources
- Processing your data
- Designing the map
- Step 3: Design your map
	- Rules for good maps
		- Always steal
		- Always grid
		- Always walk
		- Download the sample data package and how-to video library
			- $1,000 one-time cost, updates regularly; you get a link to grab 50 gigs of well-organized design files. To these you can steal, hew to, whatever. Do better (please!)
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
	- Fills
	- Points
- [Resources](#resources)
- [Read me last](#read-me-last)


| Map Component | What You Need | Where to Get It |
|:--------------|:-------------|:----------------|
| Base Geography | Vector data (roads, boundaries, water) | OpenStreetMap, Natural Earth Data |
| Terrain | Digital Elevation Models (DEM) | USGS National Map |
| Place Names | Gazetteer data | GNIS (Geographic Names Information System) |
| Land Cover | Raster data | National Land Cover Database (NLCD) |
| Reference Style | Design templates | NPS Maps, USGS Topo |

USE THE COMPUTER TO BECOME HUMAN
- LLMs spares you massive amounts of computer-mediated time
	- Using the computer to make maps sucks. I don't speak computer; I speak english. Every bit of .js, .py, .css, .html I needed to type into the computer, I hated typing
	- You can use LLMs like OpenAI's ChatGPT, Anthropic's Claude etc to translate your wishes into "code," feed the errors back, and in minutes get a working rickety script, program, command, etc. It works at every scale of computer-work that doesn't involve people. 
		- It's the simplest possible interface: you wrote a few sentences of compressed info, it gives you code, you paste it into a text editor (Or use an IDE like Cursor, Copilot, Windsurf to do it in-line), run your code, copy/paste the error log back to the LLM, repeat 'til it works. That's it.
	- Fellow cartographers: learn to speak computer or the computer will start speaking for you. Don't be run over by the computer.

- Step-by-step
	- 1. Rent some LLM time or run on your metal
		- I like Codeium's Windsurf, you can use the Cascade feature with GPT 4o or Claude 3.5  Sonnet https://codeium.com/
	- 2. Ask it to stick together 5 terabyte datasets, run through thousands of files, do anything your data-heart can imagine. You now have a beginner-intermediate programmer friend with infinite patience. 
	- 3. Use the "model" to run "agentically " with https://github.com/cline/cline or COTS it with the Windsurf IDE Cascade feature.
	- 4. 

- Introduction: why make maps, who this guide is for (designer or illustrator) 
	- Read me first <a id="read-me-first"></a>
		- You comfortable fighting with the computer and typing into something called an "Integrated Development Environment?" You want to make beautiful maps? You tolerate lots of trials? You have any graphic design/illustration talent? What follows: download links and meta-download instructions plus idiosyncratic user notes on how n = 1 computer cartographer makes his 51st percentile maps.
		- If yes: you can read this guide and use mostly-free tools to make a very nice 4x4" map. The size of a coaster. If you can make a real nice small map, you can make a real nice map of any size.
	- Computer setup
		- I use OSX, but this stuff works on windows. Past the initial setup you'll see OSX stuff only.
	- Installing software
		- QGIS
		- Design software
			- Inkscape/Illustrator
				- All commands are in Illustrator but Inkscape works about the same way
			- GIMP/Photoshop
				- Same for Photoshop
		- Other sofware 
			- Eduard
				- great for making hillshades + has a great 20m global DEM grabber
			- MAPublisher
				- costs 2800 but if you make a lot of maps professionally might be useful to you. wont be covered in this course
    - Command-line stuff, why its good and fast (this ones a maybe)
		- GDAL/OGR: I install this via miniconda, much easier to keep it updated
			- Windows GDAL
			- Mac GDAL
- 1. Map data
    - 1.x Projections 101 (very basics (since i dont know much beyond that)
    	- basic 3D > 2D geometry, sacrificing one: angles, distances, relative direction, size
    		- https://ihatecoordinatesystems.com/
    	- What you have to remember: you gotta get all your data into the same coordinate reference system (CRS). Rasters, vectors, all of it. 
    - Scale
    	- what are you trying to show?
    	- Large-scale: zoomed-in, smaller denominator
    	- Small-scale: zoomed-out, larger denominator
	- 1.x Gather raster data, diff between vector and raster
		- 1.x.x Harvesting from ESRI stuff
			- ESRI's got a dozen nouns for "pipe out of which vector and raster geodata exits," there's Feature Services, Feature Layers, Map Services, Tile Services, Image Services, Scene Services, Geoprocessing Services, Network Services, Web Map Services, Web Feature Services, Web Map Tile Service, Web Coverage Service, Hosted Layers, Stream Services, Locator Services, Data Stores.
		- 1.x.x Elevation data: collected by lidar/radar, basic concept
			- USGS sources
			- OpenTopography
			- viewfinder panoramas
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

			it'll give you all these categoreis, you dont need all of these on one map generally; making a physical geog map? keep the channels, points, bays, islands etc, ditch civil, military, etc

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
					gdal_contour -a ELEV -i 40 -f "ESRI Shapefile" in1.tif "out_1"

				I recommend using this script by Henrik https://hkartor.se/anteckningar/contour_lines_script.html
				I modded it to change the -ot to Float32 so I can use it for underwater bathy
				
				if you want contour polygons stedda lines use `-p -amin "min_elev" -amax "max_elev"` stedda `-a ELEV`

				to label contours
				https://opensourceoptions.com/how-to-create-contour-lines-and-labels-with-qgis/
				only thing id add: placement > general settings > mode: curved
				note: this breaks up your text paths. QGIS SVG export doesnt understand type on a path

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

		Can also use the built-in pattern swatches; Swatches > Open Swatch Library> Patterns > Basic Graphics > Basic Graphics_Textures, I like "USGS 17 Dry Sandy Lake." otehrs are nice too

			- Color schemes
			- Ice
			- Patterns
		- Elevation
			- Relief layer order
			- The futz...
			- Imagery drape
- Appendix
	- Learn from these tutorials

Resources <a id="resources"></a>
- [Eleanor Lutz](https://eleanorlutz.com/animated-seasons-of-arctic-ice)
- [Sarah Bell](https://petrichor.studio/2018/10/22/drawing-hillshade-shaded-relief-with-time-lapse-video-demos/)
- [Charles Preppernau](https://geolographer.xyz/)
- [Leonie Schlosser](http://leoniecartographie.com/category/cartes-geographiques/)
- [Agnes Denes](http://agnesdenesstudio.com/works18.html)
- [Nat Slaughter](https://www.centralparksquirrelcensus.com/)
- [Aaron Taveras](https://web.archive.org/web/20201125184227/https%3A//www.anagram.studio/)
- [Loraine Rutt](https://thelittleglobeco.com/thejourney)
- [Alex McPhee](https://awmcphee.ca/alberta)
- [Agnès Stienne](https://visionscarto.net/le-grand-marche-aux-terres)
- [Bill Marsh](https://web.archive.org/web/20150112164033/http%3A//marshmaps.com/exploremap.html)
- [Margot Dale Carpenter](http://www.hartdalemaps.com/)
- [Riley D. Champine](https://www.rileydchampine.com/)
- [Eric Knight](https://www.ericknightmaps.com/panoramas)
- [Jack Henderson & Pete Kennedy](https://www.pisgahmapcompany.com/shop-trail-guides/shiningrock)
- [Anton Thomas](https://www.antonthomasart.com/)
- [Daniel-Huffman](https://somethingaboutmaps.wordpress.com/)
- [Neil Gower](http://www.neilgower.com/new-page-1)
-[Sophie Parr](https://www.mapsbysophie.com/?pgid=k43oaaxs-6eaf8a24-ef2c-4e8b-9875-a78bf7244c94)
- [Anna Eshelman](https://www.annaeshelman.com/)
- [Lauren Tierney](https://laurenctierney.com/)
- [Tom Patterson](http://www.shadedrelief.com/)
- [Marty Schnure](https://martyschnure.cargo.site/cartography)
- [Jane Crosen](https://www.mainemapmaker.com/posters.html)
- [Michelle Snyder](https://www.quaillanepress.com/)
- [Margaret Pearce](https://umaine.edu/canam/publications/coming-home-map/coming-home-indigenous-place-names-canada-pdf-download/)
- [Henrik Johansson](https://hkartor.se/)
- [Mike Hall](https://www.thisismikehall.com/)
- [Carl Churchill](http://www.churchillgeo.com/)
- [Whoever does the carto for Bellerby & Co.](https://bellerbyandco.com/)
- [Historical NOAA nautical charts](https://historicalcharts.noaa.gov/)
- [U.S. National Archives](https://catalog.archives.gov/advancedsearch)
- [American Geographical Society](https://collections.lib.uwm.edu/digital/collection/agdm/search/searchterm/new%20york/page/29)
- [Collection](https://collections.lib.uwm.edu/digital/collection/agdm/search/searchterm/new%20york/page/29)
- [National Library of Scotland](https://maps.nls.uk/geo/explore/#zoom=9&lat=57.49584&lon=-4.94487&layers=3&b=1)
- [British Library](https://www.flickr.com/photos/britishlibrary/albums/72157716220271206/page10)
- [Boston Library](https://collections.leventhalmap.org/search/commonwealth%3Acj82km61z)
- [David Rumsey Map Collection](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~211864~5004539)
- [USGS historical topographic maps](https://ngmdb.usgs.gov/topoview/)
- [Public domain shaded reliefs](http://www.shadedreliefarchive.com/)
- [New York Public Library map collection](https://digitalcollections.nypl.org/divisions/lionel-pincus-and-princess-firyal-map-division)
- [Osher Map Library](https://oshermaps.org/browse-maps)
- [Perry-Castañeda Library Map Collection](https://maps.lib.utexas.edu/maps/index.html)
- [Eleanor Lutz](https://eleanorlutz.com/animated-seasons-of-arctic-ice)
- [Mike Hall](https://www.thisismikehall.com)
- [Alex McPhee](https://awmcphee.ca/alberta)
- [Daniel Huffman](https://somethingaboutmaps.com)
- [The Spatial Community](https://thespatialcommunity.org/#join)
- [Map School](https://mapschool.io/)
- [Map Resources Page](https://github.com/tolomaps/resources)
- [QGIS](https://www.qgis.org/en/site/forusers/download.html)
[QGIS tutorial 1](https://www.youtube.com/watch?v=aLmMovuydqI)
- [QGIS tutorial 2](https://www.youtube.com/watch?v=lg9ceXoCUFE&list=PL7HotvlLKHCs9nD1fFUjSOsZrsnctyV2R)
- [Head here](https://docs.conda.io/en/latest/miniconda.html)
- [Natural Earth](https://www.naturalearthdata.com/downloads/)
- [download the quick start kit](https://naciscdn.org/naturalearth/packages/Natural_Earth_quick_start.zip)
- [BBBike.org site](https://extract.bbbike.org/)
- [Globcover 2009](http://due.esrin.esa.int/page_globcover.php)
- [30-meter resolution dataset](http://www.cec.org/north-american-environmental-atlas/land-cover-30m-2015-landsat-and-rapideye/)
- [zoomed-in maps](https://www.naturalearthdata.com/downloads/10m-raster-data/)
- [zoomed-out maps](https://www.naturalearthdata.com/downloads/50m-raster-data/)
- [just the U.S.](http://shadedrelief.com/NE_100m/#download)
- [Open Terrain Project](https://github.com/openterrain/openterrain/wiki/Terrain-Data)
- [GMRT map tool](https://www.gmrt.org/GMRTMapTool/)
- [The Spatial Community](https://thespatialcommunity.org/)
- [coordinate system](https://ihatecoordinatesystems.com/)
- [easy to reproject in QGIS](https://www.youtube.com/watch?v=QKw9xOqK0pI)
- [navigating](https://www.nauticalcharts.noaa.gov/RNCOnline/rnconline.html)
- [projectionwizard.org](https://projectionwizard.org/)
- [nobody complains about that one](https://www.legallandconverter.com/p44.html)
- [EPSG.io](https://epsg.io/?q=UTM%2010N)
- [Feed that string or EPSG code into GDAL](https://medium.com/planet-stories/a-gentle-introduction-to-gdal-part-1-a3253eb96082)
- [change projections in QGIS](https://www.youtube.com/watch?v=6HkMxDijgbs)
- [Make your own in QGIS](https://www.youtube.com/watch?v=36nikpXEiGc&t=198s)
- [Try it in GDAL](https://github.com/clhenrick/gdal_hillshade_tutorial)
- [It’s free and not that hard if you follow the instructions carefully.](https://somethingaboutmaps.wordpress.com/2017/11/16/creating-shaded-relief-in-blender/)
- [Eduard](https://eduard.earth/)
- [wrote](https://petrichor.studio/2018/10/22/drawing-hillshade-shaded-relief-with-time-lapse-video-demos/)
- [two](https://www.sarahbellmaps.com/drawing-color-hillshade-a-tutorial-with-time-lapse-videos/)
- [Inkscape](https://inkscape.org/)
- [GIMP](https://www.gimp.org/)
- [MAPublisher](https://www.avenza.com/mapublisher/)
- [Join The Spatial Community Slack and get answers to your geo-questions.](https://thespatialcommunity.org/)
- [QGIS: open source GIS software for Windows, OSX, Linux](https://www.qgis.org/en/site/forusers/download.html)
- [GDAL/OGR: open source command-line GIS tools](https://medium.com/%40egiron/how-to-install-gdal-and-qgis-on-macos-catalina-ca690dca4f91)
- [Natural Earth: public domain data source for borders, countries, cities, natural features, and more](https://www.naturalearthdata.com/)
- [You into CLI + Python, R, C++? Here's every geodata processing tool](https://github.com/sacridini/Awesome-Geospatial)
- [By Maptime](http://maptime.io/lessons-resources/)
- [By Robin Tolochko](https://github.com/tolomaps/resources#general-mapping-stuff)
- [By dragons8mycat](https://dragons8mycat.com/free-gis-resources/)
- [By RT Wilson](https://freegisdata.rtwilson.com/#home)
- [GDAL/OGR cheat sheet](https://github.com/dwtkns/gdal-cheat-sheet)
- [Intro to GDAL](https://medium.com/planet-stories/a-gentle-introduction-to-gdal-part-1-a3253eb96082)
- [Intro to satellite data + GDAL](https://medium.com/%40robsimmon/making-sense-of-satellite-data-an-open-source-workflow-accessing-data-8f7f3c30f151)
- [Common satellite data + GDAL operations](https://github.com/timwallace/nicar20-imagery-with-bash)
- [Google Earth Engine end-to-end tutorial](https://courses.spatialthoughts.com/end-to-end-gee.html)
- [What the hell is a coordinate system anyway?](https://ihatecoordinatesystems.com/)
- [Square cartogram maker one](http://code.minnpost.com/aranger/)
- [and two](http://wsj.github.io/squaire/)
- [Hex car](https://pitchinteractiveinc.github.io/tilegrams/)
- [togram maker](https://pitchinteractiveinc.github.io/tilegrams/)
- [Sankey diagram maker](http://sankeymatic.com/build/)
- [Map icons](https://github.com/tangrams/icons)
- [Custom embedded Google Map and markers](https://snazzymaps.com/build-a-map)
- [Export Mapbox basemaps to JPEG](https://printmaps.mpetroff.net/)
- [Color palette generator](http://vrl.cs.brown.edu/color)
- [I Want Hue, another palette generator](https://medialab.github.io/iwanthue/)
- [In-browser land cover classifier](https://remap-app.org/remap)
- [Carl Churchill’s shaded relief tutorials](http://www.churchillgeo.com/blog/)
- [Daniel Huffman’s map tutorials](https://somethingaboutmaps.wordpress.com/tutorials/)
- [D3 cartography](https://medium.com/%40mbostock/command-line-cartography-part-1-897aa8f8ca2c)
- [Command line cartography with mapshaper](https://moriartynaps.org/command-carto-part-one/)
- [Sarah Bell’s hand-drawn shaded relief tutorial No. 1](https://www.sarahbellmaps.com/drawing-color-hillshade-a-tutorial-with-time-lapse-videos/)
- [and No. 2](https://petrichor.studio/2018/10/22/drawing-hillshade-shaded-relief-with-time-lapse-video-demos/)
- [Excel geocoder](http://excelgeocodingtool.com/)
- [Paste-in-](https://geocode.localfocus.nl/)
- [addresses geocoder](https://geocode.localfocus.nl/)
- [Change DMS coordinates to decimal degrees](https://gis.stackexchange.com/questions/79207/coordinates-values-change-for-arcgis/79218)
- [Generate a DEM from LIDAR](https://dominoc925.blogspot.com/2017/07/use-pdal-to-generate-dem-from-lidar-las.html)
- [Library of Congress (change search dropdown to maps)](https://loc.gov/)
- [Historical NOAA nautical charts](https://historicalcharts.noaa.gov/)
- [U.S. National Archives](https://catalog.archives.gov/advancedsearch)
- [American Geographical Society Collection](https://collections.lib.uwm.edu/digital/collection/agdm/search/searchterm/new%20york/page/29)
- [National Library of Scotland](https://maps.nls.uk/geo/explore/#zoom=9&lat=57.49584&lon=-4.94487&layers=3&b=1)
- [British Library](https://www.flickr.com/photos/britishlibrary/albums/72157716220271206/page10)
- [Boston Library](https://collections.leventhalmap.org/search/commonwealth%3Acj82km61z)
- [David Rumsey Map Collection](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~211864~5004539)
- [USGS historical topographic maps](https://ngmdb.usgs.gov/topoview/)
- [Public domain shaded reliefs](http://www.shadedreliefarchive.com/)
- [New York Public Library map collection](https://digitalcollections.nypl.org/divisions/lionel-pincus-and-princess-firyal-map-division)
- [Perry-Castañeda Library Map Collection](https://maps.lib.utexas.edu/maps/index.html)
- [Osher Map Library](https://oshermaps.org/browse-maps)
- [Eleanor Lutz](https://eleanorlutz.com/animated-seasons-of-arctic-ice)
- [Sarah Bell](https://petrichor.studio/2018/10/22/drawing-hillshade-shaded-relief-with-time-lapse-video-demos/)
[Charles Preppernau](https://geolographer.xyz/)
- [Leonie Schlosser](http://leoniecartographie.com/category/cartes-geographiques/)
- [Agnes Denes](http://agnesdenesstudio.com/works18.html)
- [Nat Slaughter](https://www.centralparksquirrelcensus.com/)
- [Aaron Taveras](https://web.archive.org/web/20201125184227/https%3A//www.anagram.studio/)
- [Loraine Rutt](https://thelittleglobeco.com/thejourney)
- [Alex McPhee](https://awmcphee.ca/alberta)
- [Agnès Stienne](https://visionscarto.net/le-grand-marche-aux-terres)
- [Bill Marsh](https://web.archive.org/web/20150112164033/http%3A//marshmaps.com/exploremap.html)
- [Margot Dale Carpenter](http://www.hartdalemaps.com/)
- [Riley D. Champine](https://www.rileydchampine.com/)
- [Eric Knight](https://www.ericknightmaps.com/panoramas)
- [Jack Henderson & Pete Kennedy](https://www.pisgahmapcompany.com/shop-trail-guides/shiningrock)
- [Anton Thomas](https://www.antonthomasart.com/)
- [Neil Gower](http://www.neilgower.com/new-page-1)
- [Sophie Parr](https://www.mapsbysophie.com/?pgid=k43oaaxs-6eaf8a24-ef2c-4e8b-9875-a78bf7244c94)
- [Anna Eshelman](https://www.annaeshelman.com/)
- [Lauren Tierney](https://laurenctierney.com/)
- [Tom Patterson](http://www.shadedrelief.com/)
- [Marty Schnure](https://martyschnure.cargo.site/cartography)
- [Jane Crosen](https://www.mainemapmaker.com/posters.html)
- [Michelle Snyder](https://www.quaillanepress.com/)
- [Margaret Pearce](https://umaine.edu/canam/publications/coming-home-map/coming-home-indigenous-place-names-canada-pdf-download/)
- [Henrik Johansson](https://hkartor.se/)
- [Mike Hall](https://www.thisismikehall.com/)
- [Carl Churchill](http://www.churchillgeo.com/)
- [Whoever does the carto for Bellerby & Co.](https://bellerbyandco.com/)
- [30m U.S. land cover (NLCD)](https://www.mrlc.gov/viewer/)
- [30m U.S. croplands](https://nassgeodata.gmu.edu/CropScape/)
- [30m North American land cover](http://www.cec.org/north-american-environmental-atlas/land-cover-30m-2015-landsat-and-rapideye/)
- [30m global land cover](http://data.ess.tsinghua.edu.cn/)
- [100m global land cover](https://lcviewer.vito.be/download)
- [300m global land cover](http://maps.elie.ucl.ac.be/CCI/viewer/download.php)
- [100m CONUS shaded relief + land cover](http://shadedrelief.com/NE_100m/#download)
- [30-90m elevation data](https://medium.com/wegaw/free-geospatial-data-sources-an-attempt-to-tame-the-beast-part-1-1608ed4c8800)
- [Elevation data finder: openterrain](https://github.com/openterrain/openterrain/wiki/Terrain-Data)
- [Elevation data finder: opendem](https://opendem.info/opendemsearcher.html)
- [Elevation data finder: opentopography](https://portal.opentopography.org/datasets)
- [Elevation data finder: imagico](http://www.imagico.de/map/demsearch.php)
- [Bathymetry finder](https://www.gmrt.org/GMRTMapTool/)
- [Antarctic bathymetry](https://www.scar.org/science/ibcso/ibcso/)
- [U.S. wildfire perimeters](https://blog.mapbox.com/open-data-for-mapping-wildfires-smoke-and-air-quality-b4ae8b0f14bd)
- [Remote sensing basics](https://ecologicalprocesses.springeropen.com/articles/10.1186/s13717-020-00255-4)
- [250m Blue Marble](http://geospatialearth.in/BM.php)
- [Sentinel-2 + Landsat 8 browser: Sentinel Playground](https://apps.sentinel-hub.com/sentinel-playground-temporal/)
- [Sentinel-2 + Landsat 8 browser: EO Browser](https://apps.sentinel-hub.com/eo-browser/?zoom=10&lat=41.9&lng=12.5&themeId=DEFAULT-THEME)
- [MODIS/VIIRS browser](http://ge.ssec.wisc.edu/modis-today/)
- [GOES-16 browser](https://zoom.earth/#view=41.078,-126.31,7z/date=2020-09-10,11:30,-4/layers=live,fires)
- [Sentinel-1 browser](https://kristofvantricht.users.earthengine.app/view/sarworld)
- [Download by lat/long from all of NOAA’s sensors](https://coastwatch.pfeg.noaa.gov/erddap/griddap/index.html?page=1&itemsPerPage=1000)
- [High-resolution imagery browser (expensive)](https://discover.digitalglobe.com/)
- [Tim Wallace’s satellite imagery resources](https://github.com/timwallace/nicar20-imagery-sources)
- [How to find the most recent imagery](https://www.azavea.com/blog/2020/01/02/how-to-find-the-most-recent-satellite-imagery/)
- [Charlie Loyd’s imagery compendium](https://planet.parts/)
- [How's your javascript? Google Earth Engine has all sat data and you can do anything you want to ten billion pixels at once](https://code.earthengine.google.com/register)
- [Download OpenStreetMap raster tiles](http://bigmap.osmz.ru/index.html)
- [Download OSM data by bounding box](https://extract.bbbike.org/)
- [Download Overture Maps Foundation data by bounding box (I wrote this in an hour using GPT4)](https://overturegrabber.evanapplegate.com)
- [Download OSM data by city](https://www.interline.io/osm/extracts/)
- [Download OSM data by country](https://download.geofabrik.de/)
- [Building footprints for the](https://www.microsoft.com/en-us/maps/building-footprints)
- [U.S.,](https://www.microsoft.com/en-us/maps/building-footprints)
- [Canada, Tanzania, Uganda](https://www.microsoft.com/en-us/maps/building-footprints)
- [Global city boundaries](http://quattroshapes.com/)
- [U.S. Census geodata](https://censusreporter.org/)

## Read Me Last <a id="read-me-last"></a></br>
The most beautiful maps are not behind us: they will be made today, by people who cared enough to make them. That sounds like you.

- Great maps require no formal training or credentials. I learned by trial and so will you.
	- The best contemporary mapmakers taught themselves: Eleanor Lutz is a bio PhD and learned cartography on her own. Illustrator Mike Hall sketched maps in his notebook during shifts as a security guard, and now has an agent to handle his map deals. Alex McPhee studied geophysics, decided he needed to map his native Alberta, got some open source geo-software and made one of the best modern reference maps.
- Mapmaking is like cooking: you pick what you like to eat, and improve by trial. You’ll over-salt a few dishes, ruin a few pans and come out a master. You just have to pick some Territory to commemorate.
- Cartography is making the infinite Territory legible to humans, which gives you many ways to get to the same point.
- Find some Territory you care about: your yard, your street, your neighborhood, your town, your favorite patch of woods. Get a pencil and paper. Mark what you care about. You’re now a cartographer. If you stopped reading and drew a map on a paper towel, I’d be satisfied.
- You can make a map with charcoals and an easel, a stick and some sand, a pencil and graph paper, a grid computing cluster, some hideously expensive software, some there’s-no-way-this-is-free software, a drone with a camera, a satellite with a radiometer, all ways to the same end. There’s no “correct” way to make a high-effort map.
- I learned cartography at close range from Daniel Huffman. If possible close this tab, get a desk next to a cartographer, pester with questions for 1+ year.
- Every cartographer has their own idiosyncratic way of making maps; this is only what I can get my head around. If this doesn’t work for you please check out other ’tographer tutorials at the bottom, they might click better.
	- My entire toolkit:
		- QGIS
	- MAPublisher
	- Mapbox Studio
	- Photoshop
	- Illustrator
	- InDesign
	- Windsurf Cascade talks to LLMs that handle:
		- GDAL
		- Python
		- Imagemagick
	- My map workflow, you’ll find yours soon enough:
		- Download geographic data: roads, rivers, lakes, hills, valleys, towns, lighthouses, etc.
		- Thin out, clean, futz with that data in free software programs QGIS and GDAL. Modern start-with-pile-of-data carto is about knowing what to leave off the map, so you’ll spend a lot of time sifting tangles of data for what you actually want to show.
		- Make the remaining data look nice in your graphic design software.
		- To embellish: hire illustrators, letterers, other artists.
			- "Nothing is as good as the absence of bad." I don't request many revisions. If the work-for-hire contractor is not real close to what I want, I say "Thanks!" pay the last half and find someone else.

1.1 Basic Raster Processing
1.1.1 Merging Tiles
Exercise 1
1.1.2 Converting Formats
1.1.3 Compressing Output
1.1.4 Setting NoData Values
1.1.5 Writing Cloud-Optimized GeoTIFF (COG)
1.2 Processing Elevation Data
1.2.1 Creating Hillshade
1.2.2 Creating Color Relief
Exercise 2
1.3 Processing Aerial Imagery
1.3.1 Create a preview image from source tiles
1.3.2 Create a Tile Index
1.3.3 Mosaic and clip to AOI
1.3.5 Creating Overviews
1.4 Processing Satellite Imagery
1.4.1 Merging individual bands into RGB composite
1.4.2 Apply Histogram Stretch and Color Correction
1.4.3 Raster Algebra
Exercise 3
1.4.4 Pan Sharpening
1.5 Processing WMS Layers
1.5.1 Listing WMS Layers
1.5.2 Creating a Service Description File
1.5.3 Downloading WMS Layers
Exercise 4
1.6 Georeferencing
1.6.1 Georeferencing Images with Bounding Box Coordinates
1.6.2 Georeferencing with GCPs
Exercise 5
Assignment
2. OGR Tools
2.1 ETL Basics
2.1.1 Read a CSV data source
2.1.2 Convert it to point data layer
2.1.3 Assign it a CRS
2.1.4 Extract a subset
2.1.5 Change the data type of a column
2.1.6 Rename the layer in GeoPackage.
Exercise 6
2.2 Merging Vector Files
Exercise 7
2.3 Geoprocessing and Spatial Queries
2.3.1 Reprojecting Vector Layers
2.3.2 Creating Buffers
2.3.3 Performing Spatial Queries
2.3.4 Data Cleaning
3. Running commands in batch
4. Automating and Scheduling GDAL/OGR Jobs
Tips for Improving Performance
Configuration Options
Multithreading
Supplement
Check Supported Formats and Capabilities
Extracting Image Metadata and Statistics
Validating COGs
Creating Contours
Creating Colorized Imagery
Creating Colorized Hillshade
Removing JPEG Compression Artifacts
Splitting a Mosaic into Tiles
Extracting Projection Information from a Raster
Merging Files with Different Resolutions
Calculate Pixel-Wise Statistics over Multiple Rasters
Extracting Values from a Raster
Raster to Vector Conversion
Viewshed Analysis
Working with KML Files
Exporting Data to KML files
Converting KML Files to Other Formats
KML vs. LIBKML Drivers
Group Statistics
Using Virtual Layers
Read Geonames Files
Applying Filters
Merging Files
Resources
Data Credits
License