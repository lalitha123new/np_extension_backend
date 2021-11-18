import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { CalendarComponent } from './dashboard/calendar/calendar.component';

FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin]);

const COMPONENTS = [LoginComponent, RegisterComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule, FullCalendarModule, FormsModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, CalendarComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule {}
