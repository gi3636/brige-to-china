const ports = [];

self.onconnect = (e) => {
  const port = e.ports[0];
  console.log('e.ports', e.ports);
  console.log('ports', ports);
  console.log('port', port);
  port.onmessage = (e) => {
    console.log('e', e);
  };
  ports.push(port);
};

self.addEventListener('disconnect', (e) => {
  console.log(e);
});
