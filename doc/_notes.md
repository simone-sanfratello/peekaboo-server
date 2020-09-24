#### curl

curl -X POST -i 'http://localhost:8080/url/https://postman-echo.com/post?a=b' --data "param1=value1&param2=value2"

curl http://localhost:8080/url/https://google.com

#### self signed (not valid)

openssl req -x509 -out cert/cert.pem -keyout cert/key.pem \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

#### mkcert

sudo apt install libnss3-tools golang-1.14-go.

# curl -LO https://get.golang.org/$(uname)/go_installer && chmod +x go_installer && ./go_installer && rm go_installer
cd /tmp
git clone https://github.com/FiloSottile/mkcert && cd mkcert
go build -ldflags "-X main.Version=$(git describe --tags)"

sudo mv /tmp/mkcert/mkcert /usr/local/bin/
mkcert -install
mkcert -key-file cert/key.pem -cert-file cert/cert.pem localhost

#### docker

docker build -t braces/peekaboo .
docker run -itd --name peekaboo -p 8080:8080 braces/peekaboo

docker run --mount type=bind,source="$(pwd)"/settings,target=/app/bin/settings -itd --name peekaboo -p 8080:8080 braces/peekaboo

docker run -e PEEKABOO_LOG_LEVEL=trace -itd --name peekaboo -p 8080:8080 braces/peekaboo

## start

npm i peekaboo-server
peekaboo-server