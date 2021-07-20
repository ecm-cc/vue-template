import createApp from './app';

export default (context) => new Promise((resolve, reject) => {
    const { app, router } = createApp(context);
    router.push(context.url);
    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents();
        if (!matchedComponents.length) {
            return reject(new Error({ code: 404 }));
        }
        return resolve(app);
    });
});
