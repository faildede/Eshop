import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export  const Reviews = () => {

    return(
          <section className="max-w-5xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-semibold">Отзывы клиентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Алия Т.</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Отличное качество и очень стильный дизайн! Получила свой заказ за 2 дня, всё подошло.
                    Обязательно закажу ещё.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Руслан К.</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Очень понравилась толстовка! Удобно, тепло и приятно, что в дизайне отражены
                    национальные мотивы.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
    )
}