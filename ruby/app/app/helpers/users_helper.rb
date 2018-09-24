module UsersHelper

    #Return gravatar
    def gravatar_for(user, options = {size: 80})
        size = options[:size]
        url = "https://secure.gravatar.com/avatar/#{Digest::MD5::hexdigest(user.email)}?s=#{size}"
        image_tag(url, alt: user.name, class: "gravatar")
    end
end
