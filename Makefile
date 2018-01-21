OBJECTS = htdocs/* htdocs/.htaccess
SERVER = hhsw.de@ssh.strato.de:sites/markusfisch
OPTIONS = --recursive \
	--links \
	--update \
	--delete-after \
	--times \
	--compress

compose: contents layouts lib
	bin/simsalabash

sync: compose
	rsync $(OPTIONS) $(OBJECTS) $(SERVER)

clean:
	rm -f htdocs/*.html*
