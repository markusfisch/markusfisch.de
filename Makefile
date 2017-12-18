OBJECTS = css \
	downloads \
	icons \
	images \
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
	cd htdocs && rsync $(OPTIONS) $(OBJECTS) $(PRODUCTION)

proto: compose
	cd htdocs && rsync $(OPTIONS) $(OBJECTS) $(PROTO)

compose:
	simsalabash

clean:
	rm -f htdocs/*.html*
