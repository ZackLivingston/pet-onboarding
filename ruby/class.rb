class ApiConnector
    attr_accessor :title, :desc, :url

    def initialize(title: title, desc: desc, url: url = 'google.ca')   #runs every time apiconnector.new is
        @title = title
        @desc = desc
        @url = url
    end

    def test_method
        puts @title
        puts @desc
        puts @url
    end

end

# api = ApiConnector.new(title: 'test', desc: 'description')

# #puts api.desc
# api.test_method

class SMSConnector < ApiConnector
    def send_sms
       puts "sending sms: #{@title} to #{@url}" 
       privateMethod
    end

    def test_method
        super # will call parent's test_method
        puts 'Overwritten test_method'
    end

    private def privateMethod
        puts 'private'
    end
end

api = SMSConnector.new(title: 'test', desc: 'description')
api.test_method
api.send_sms
#api.privateMethod # will not call


