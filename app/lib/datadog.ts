import { datadogRum } from '@datadog/browser-rum';

export function initDatadogRum(): void {
  datadogRum.init({
    clientToken: 'pubd5a8d9f520587e3d228363b99a7ef577',
    applicationId: '0b8d8e6b-8933-4859-9306-247f0895bff2',
    site: 'datadoghq.eu',
    service: 'eurofuels-front',
    env: 'prod',
    version: __APP_VERSION__,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'allow'
  });
}
