OBJECTS = css \
	doc \
	downloads \
	icons \
	images \
	js \
	*.html* .ht* *.txt
PRODUCTION = hhsw.de@ssh.strato.de:sites/markusfisch/
PROTO = hhsw.de@ssh.strato.de:sites/proto/markusfisch/
OPTIONS = --recursive \
	--links \
	--update \
	--delete-after \
	--times \
	--compress

production: compose
	cd htdocs && rsync $(OPTIONS) \
		$(OBJECTS) \
		$(PRODUCTION)

proto: compose
	cd htdocs && rsync $(OPTIONS) \
		$(OBJECTS) \
		$(PROTO)

compose: js css
	simsalabash

css:
	srcar \
		Index.css \
		Contents.css \
		ImageGallery.css \
		Demos.css \
		body.css

js:
	TYPE=js COMPRESSOR=jspack WATCH=contents srcar \
		ZoomGrid.js \
		ZoomGridTransparency.js \
		ZoomGridHighlight.js \
		ZoomGridMaxChildWidth.js \
		ZoomGridFrame.js \
		ZoomGridRestoreButton.js \
		ZoomGridDisableFoldedLinks.js \
		WebPieIcon.js \
		WebPie.js \
		ImageViewer.js \
		DemoZoomGrid.js \
		DemoWebPie.js \
		Demos.js \
		App.js \
		main.js

clean:
	rm -f htdocs/*.html \
		htdocs/js/ar* \
		htdocs/css/ar*
