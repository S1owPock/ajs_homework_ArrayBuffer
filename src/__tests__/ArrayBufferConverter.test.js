import ArrayBufferConverter from '../js/arrayBufferConverter';

function getBuffer() {
  const data = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
  return ((input) => {
    const buffer = new ArrayBuffer(data.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < input.length; i += 1) {
      bufferView[i] = input.charCodeAt(i);
    }
    return buffer;
  })(data);
}

test('testing class ArrayBufferConverter method load()', () => {
  const data = {
    data: {
      user: {
        id: 1,
        name: 'Hitman',
        level: 10,
      },
    },
  };

  const arrayBuffer = new Uint16Array(getBuffer());
  const buffer = ArrayBufferConverter.load(data);
  expect(buffer).toEqual(arrayBuffer);
});

test('testing class ArrayBufferConverter method toString()', () => {
  const data = {
    data: {
      user: {
        id: 1,
        name: 'Hitman',
        level: 10,
      },
    },
  };
  const arrayBuffer = getBuffer();
  const buffer = ArrayBufferConverter.toString(arrayBuffer);

  expect(JSON.parse(buffer)).toEqual(data);
});
