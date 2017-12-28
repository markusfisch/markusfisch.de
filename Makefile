OBJECTS = annuals \
	arch \
	css \
	downloads \
	icons \
	*.html* .ht* *.txt
SERVER = hhsw.de@ssh.strato.de:sites/proto/markusfisch/
OPTIONS = --recursive \
	--links \
	--update \
	--delete-after \
	--times \
	--compress

htdocs: contents
	bin/simsalabash

sync: htdocs
	cd htdocs && rsync $(OPTIONS) $(OBJECTS) $(SERVER)

clean:
	rm -f htdocs/*.html*
