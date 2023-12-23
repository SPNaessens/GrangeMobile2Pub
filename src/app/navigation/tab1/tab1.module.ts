import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { StudentCreateService } from '..//services/studentcreate.service';
import { StudentDataService} from '..//services/studentdata.service';
import { ModuleDataService } from '../services/moduledata.service';
import { LecturerDataService } from '../services/lecturerdata.service';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page],
  providers: [StudentCreateService, StudentDataService, ModuleDataService, LecturerDataService],
})
export class Tab1PageModule {}
