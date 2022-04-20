import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider
);
