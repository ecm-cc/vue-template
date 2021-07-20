module.exports = (appName, basePath = null, tenantID = null) => ({
    appName: `${appName}`,
    customHeadlines: [
        {
            caption: 'Rückfrageprozess',
            description: 'Konfiguration der Kontextaktion',
            menuItems: [
                {
                    caption: 'Kontextaktion "Rückfrageübersicht"',
                    description: 'Konfigurieren Sie die Sichtbarkeit der Kontextaktion "Rückfrageübersicht"',
                    href: `/${appName}/configOverview`,
                    keywords: ['Rückfrage', 'Kontextaktion', 'Sichtbarkeit', 'Inquiry', 'Prozess', 'Rückfrageprozess', 'Übersicht'],
                    configurationState: 0,
                },
                {
                    caption: 'Kontextaktion "Rückfrage erstellen"',
                    description: 'Konfigurieren Sie die Sichtbarkeit der Kontextaktion "Rückfrage erstellen"',
                    href: `/${appName}/configInquiry`,
                    keywords: ['Rückfrage', 'Kontextaktion', 'Sichtbarkeit', 'Inquiry', 'Prozess', 'Rückfrageprozess'],
                    configurationState: 0,
                },
            ],
        },
    ],
});
