import { auth } from "@/lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import DateSelector from "@/components/DateSelector";
import LoginMessage from "@/components/LoginMessage";
import ReservationForm from "@/components/ReservationForm";
import { ReservationProvider } from "@/components/ReservationContext";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <ReservationProvider>
      <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
        {session?.user ? (
          <ReservationForm cabin={cabin} user={session.user} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </ReservationProvider>
  );
}

export default Reservation;
