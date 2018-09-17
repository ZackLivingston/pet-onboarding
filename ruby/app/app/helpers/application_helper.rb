module ApplicationHelper
# All methods declared in this will be available to all views

    #generates the full title of a given page
    def full_title(page_title = '')
        base_title = 'Test Ruby Site'
        unless page_title.empty?
            "#{page_title} | #{base_title}"
        else
            base_title
        end
    end
end
