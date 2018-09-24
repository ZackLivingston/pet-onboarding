module SessionsHelper

    def log_in(user)
        session[:user_id] = user.id
    end

    def current_user
        if session[:user_id]
            @current_user ||= User.find_by(id: session[:user_id]) # same as @cu = cu || dbcall
        elsif !User.find_by(id: cookies.signed[:user_id]).nil?
            user = User.find_by(id: cookies.signed[:user_id])
            puts 'FOUND USER FROM COOKIE'
            if user && user.authenticated?(cookies[:remember_token])
                log_in user
                @current_user = user
            end
        end
    end

    def logged_in?
        # if !cookies[:remember_token].nil?
        #     log_in(User.find_by(id: cookies.signed[:user_id]))
        !current_user.nil? # if user is not nil, return true (logged in), else return false (not logged in)
    end

    def log_out(remember_me)
        forget(current_user)
        session[:user_id] = nil
        # or, session.delete(:user_id)
        @current_user = nil
    end

    def remember(user)
        user.remember
        #cookies[:user_id] = {value: user.id, expires: 20.years.from_now.utc}
        cookies.permanent.signed[:user_id] = user.id
        cookies.permanent[:remember_token] = user.remember
    end

    def forget(user)
        user.forget
    end

end
