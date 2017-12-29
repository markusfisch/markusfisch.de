OBJECTS = htdocs/* htdocs/.htaccess
SERVER = hhsw.de@ssh.strato.de:sites/markusfisch
OPTIONS = --recursive \
	--links \
	--update \
	--delete-after \
	--times \
	--compress

htdocs: contents layouts lib
	bin/simsalabash

sync: htdocs
	rsync $(OPTIONS) $(OBJECTS) $(SERVER)

clean:
	rm -f htdocs/*.html*
