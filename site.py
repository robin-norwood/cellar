import web

urls = (
  '/', 'index',
  '/levels/(\w+)', 'levels'
)

app = web.application(urls, globals())

application = app.wsgifunc()

class levels:
    level_map = {
        'wilderness': '/var/www/cellar/wilderness.json'
        }

    def GET(self, name):
        web.header('Content-Type', 'application/json')
        data = 'Level not found'
        if self.level_map.get(name, False):
            f = open(self.level_map[name])
            data = f.readlines()
            f.close()

        return data

if __name__ == '__main__':
    app.run()
