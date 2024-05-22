import { createPinia } from 'pinia';
const pinia = createPinia();

// event logger
pinia.use(({ store }) => {
  if (store) {
    store.$onAction(({ name, args, after, onError }) => {
      console.log(`%c 🍍 Event Name: ${name}`, 'background: #222; color: #bada55');
      const startTime = Date.now();
      console.log(`%c 🍍 Start: '${name}' with params [${args.join(', ')}].`, 'background: #222; color: #bada55');
      after((result) => {
        console.log(
          `%c 🍍 Finished: '${name}' after ${Date.now() - startTime}ms.\nResult: ${result}.`,
          'background: #222; color: #bada55',
        );
      });
      onError((error) => {
        console.log(
          `%c 🍍 Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`,
          'background: red; color: white',
        );
      });
    });
  }
});

export default pinia;
