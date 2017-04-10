# based on https://gist.github.com/jgatjens/8925165
module Jekyll
    class LoopDirectoryTag < Liquid::Block

        include Liquid::StandardFilters
        Syntax = /(#{Liquid::QuotedFragment}+)?/

        def initialize(tag_name, markup, tokens)
            @attributes = {}

            @attributes['directory'] = '';
            @attributes['iterator'] = 'item';
            @attributes['filter'] = 'item';
            @attributes['sort'] = 'ascending';
            @attributes['replace'] = '';
            @attributes['with'] = '';

            # Parse parameters
            if markup =~ Syntax
                markup.scan(Liquid::TagAttributes) do |key, value|
                    puts '## ' + key;
                    if key == 'directory' || key == 'filter' || key == 'replace' || key == 'with'
                        value = value.gsub('"', '');
                        value = value.gsub("'", '');
                        @attributes[key] = value;
                    else
                        @attributes[key] = value;
                    end 
                end
            else
                raise SyntaxError.new("Bad options given to 'loop_directory' plugin.")
            end

            super
        end

        def render(context)
            context.registers[:loop_directory] ||= Hash.new(0)

            path = File.join(@attributes['directory'], @attributes['filter']);
            images = Dir.glob(path);
            result = []

            context.stack do
                # return pathname
                images.each { |pathname| 
                  pathname = pathname.gsub(@attributes['replace'], @attributes['with']);
                  context[@attributes['iterator']] = pathname
                  result << render_all(@nodelist, context)
                }
            end

            result
        end
    end
end

Liquid::Template.register_tag('loop_directory', Jekyll::LoopDirectoryTag)